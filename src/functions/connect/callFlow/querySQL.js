
const { tables } = require('../../../utils/error/errorMessages');

const checkQueue = async ({
  routingMethod, allocationGroupId, queueSelectionRuleId, queueId, callRoutingTypeId, callerId, cb, applicationId, timeZone,
}) => {
  console.log('RoutingMethod:', routingMethod);
  if (routingMethod === 'DirectToQueue') {
    return directToQueue({
      cb, queueId, callRoutingTypeId, callerId, applicationId, timeZone,
    });
  }
  if (routingMethod === 'QueueSelectionRule') {
    return queueSelectionRule({ queueSelectionRuleId });
  }

  return percentAllocationQueue({
    cb, callRoutingTypeId, allocationGroupId, callerId, applicationId, timeZone,
  });
};

const getQueue = async ({ queueId }) => {
  const { Queue, Language, ConnectQueue } = require('../../../models');
  let queueItem;
  console.log(queueId);
  try {
    queueItem = await Queue.findById(queueId, {
      include: [
        { model: Language, as: 'Language', attributes: ['Name'] },
        { model: ConnectQueue, as: 'ConnectQueue', attributes: ['ARN'] },
      ],
    });
  } catch (err) {
    console.log('Error:', err);
    queueItem = null;
  }

  console.log(JSON.stringify(queueItem, null, 2));
  return queueItem || queueItem.toJSON();
};

const directToQueue = (params) => getQueue(params);

const queueSelectionRule = async ({ queueSelectionRuleId }) => {
  const { QueueSelectionRule, ConnectQueue } = require('../../../models');
  const queueSelectionRule = await QueueSelectionRule.findById(queueSelectionRuleId, {
    include: [
      {
        model: ConnectQueue,
        as: 'PrimaryConnectQueue',
      },
      {
        model: ConnectQueue,
        as: 'SecondaryConnectQueue',
      },
    ],
  });
  return {
    Id: null,
    ConnectQueue: queueSelectionRule.PrimaryConnectQueue,
    PrimaryQueueArn: queueSelectionRule.PrimaryConnectQueue.ARN,
    SelectionRule: queueSelectionRule.PrimarySelectionRule,
    SelectionOperator: queueSelectionRule.PrimarySelectionOperator,
    SelectionValue: queueSelectionRule.PrimarySelectionValue,
    SecondaryQueueArn: queueSelectionRule.SecondaryConnectQueue ? queueSelectionRule.SecondaryConnectQueue.ARN : '',
  };
};


const percentAllocationQueue = async ({
  cb, callTypeId, allocationGroupId, callerId, applicationId, timeZone,
}) => {
  const { AllocationRule, AllocationGroup, Sequelize } = require('../../../models/writer');
  const allocationRules = await AllocationRule.findAll({
    include: [
      {
        model: AllocationGroup,
        as: 'AllocationGroup',
        where: {
          Id: allocationGroupId,
        },
        required: true,
      },
    ],
    order: [
      ['Percentage', 'desc'],
    ],
  });

  if (!allocationRules.length) throw (tables.ALLOCATION_ERROR);
  const allocationGroup = allocationRules[0].AllocationGroup;

  console.log('AllocationRules', JSON.stringify(allocationRules));

  // Get TotalCount
  const totalCount = allocationRules.reduce((sum, rule) => sum + rule.Count, 0);
  const availableRules = allocationRules.filter((allocationRule) => {
    if (totalCount === 0) return true;
    const actualPercentage = allocationRule.Count / totalCount * 100;
    if (actualPercentage > allocationRule.Percentage) return false;
    allocationRule.ActualPercentage = actualPercentage;
    allocationRule.ThresholdPercentage = allocationRule.Percentage - actualPercentage;
    return true;
  });

  if (availableRules.length === 0) throw tables.QUEUE_ERROR;

  // Get the first free queue
  let finalRule;
  for (let i = 0; i < availableRules.length; i++) {
    if (availableRules[i].ThresholdPercentage > 0) {
      console.log('Percentage, Actual Percentage, Threshold Percentage', availableRules[i].Percentage, availableRules[i].ActualPercentage, availableRules[i].ThresholdPercentage);
      finalRule = availableRules[i];
      break;
    }
  }

  // Choose the first allocation rule if all are tied to its percentage
  if (!finalRule) {
    finalRule = availableRules[0];
  }

  await Promise.all([
    AllocationRule.update({
      Count: Sequelize.literal('Count + 1'),
    }, {
      where: {
        Id: finalRule.Id,
      },
    }),
    AllocationGroup.update({
      TotalCount: Sequelize.literal('TotalCount + 1'),
    }, {
      where: {
        Id: allocationGroup.Id,
      },
    }),
  ]);

  console.log('AllocationGroup', JSON.stringify(allocationGroup, null, 2));
  console.log('FinalRule', JSON.stringify(finalRule, null, 2));

  const { QueueId } = finalRule;
  return await getQueue({
    cb, queueId: QueueId, callTypeId, callerId, applicationId, timeZone,
  });
};

module.exports = {
  checkQueue,
};
