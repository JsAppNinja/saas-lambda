const moment = require('moment-timezone');


module.exports = async (items, timeZone, currentDateTime) => {
  // const {OperationHour} = require('../../../models');
  const { OperationHour } = null;
  const callTime = currentDateTime.tz(timeZone);
  let minSequence = 0;
  let lowest = 0;
  const tz = timeZone;
  const operationHoursItemsPromises = await items.map(async (item) => OperationHour.findAll({
    where: {
      DestinationId: item.Id,
    },
  }));

  console.log('dayOfWeek', callTime.format('dddd'));

  return Promise.all(operationHoursItemsPromises)
    .then((operationHoursItems) => {
      // console.log('typeof operationHoursItems', typeof operationHoursItems);

      const DestinationObjects = items.filter((item, index) => {
        // If sequence is 99, always open
        if (item.SeqNum === 99) return true;
        // Check expiry date
        const expiryDate = item.ExpiryDate;
        if (moment.tz(expiryDate, timeZone).add(1, 'd').isBefore(callTime)) return false;

        const date = callTime.format('YYYY-MM-DD');
        let ops = operationHoursItems[index];
        ops = ops.filter((op) => {
          const dateInTimeZone = callTime;
          const dayOfWeek = dateInTimeZone.day();
          // console.log(JSON.stringify(op), dayOfWeek, item.Id);
          if (dayOfWeek === op.DayOfWeek && item.Id === op.DestinationId) {
            console.log(JSON.stringify(op), dayOfWeek, item.Id);
            const startTime = moment.tz(`${date}T${op.StartTime}`, tz);
            const endTime = moment.tz(`${date}T${op.EndTime}`, tz);
            if (startTime.isBefore(callTime) && callTime.isBefore(endTime)) {
              console.log('Matched Time', tz, date, startTime.format(), callTime.format(), endTime.format());
              return true;
            }
          }
          return false;
        });

        console.log('operationHoursItems:', JSON.stringify(ops, null, 2));

        if (!ops.length) {
          return false;
        }

        return true;
      });

      // console.log('We are after DestinationObjects starts');

      console.log('DestinationObjects:', JSON.stringify(DestinationObjects));

      if (!DestinationObjects.length) {
        return;
      }

      // console.log(DestinationObjects);

      DestinationObjects.forEach((item, index) => {
        console.log(JSON.stringify(item));

        if (index === 0) { // first element
          minSequence = item.SeqNum; // set first one like the lowest one
          lowest = index;
        }

        if (item.SeqNum < minSequence) {
          console.log('item.seqNum', item.SeqNum);
          console.log('minSequence', minSequence);

          minSequence = item.SeqNum;
          lowest = index;
        }
      });

      console.log('Destination:', DestinationObjects[lowest].toJSON());

      return DestinationObjects[lowest];
    });
};
