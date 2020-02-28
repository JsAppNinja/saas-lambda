const moment = require('moment-timezone');


module.exports = async (items, timeZone, currentDateTime) => {
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

  return Promise.all(operationHoursItemsPromises)
    .then((operationHoursItems) => {
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
          if (dayOfWeek === op.DayOfWeek && item.Id === op.DestinationId) {
            const startTime = moment.tz(`${date}T${op.StartTime}`, tz);
            const endTime = moment.tz(`${date}T${op.EndTime}`, tz);
            if (startTime.isBefore(callTime) && callTime.isBefore(endTime)) {
              return true;
            }
          }
          return false;
        });

        if (!ops.length) {
          return false;
        }

        return true;
      });

      if (!DestinationObjects.length) {
        return;
      }

      DestinationObjects.forEach((item, index) => {

        if (index === 0) { // first element
          minSequence = item.SeqNum; // set first one like the lowest one
          lowest = index;
        }

        if (item.SeqNum < minSequence) {
          minSequence = item.SeqNum;
          lowest = index;
        }
      });

      return DestinationObjects[lowest];
    });
};
