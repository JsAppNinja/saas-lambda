const request = require('superagent');
require('superagent-proxy')(request);
const wrapper = require('../../../utils/lambdaHelper');
const proxy = process.env.PROXY;
const ctrApiEndpoint = process.env.CTR_API_ENDPOINT;
const hgvBaseUrl = process.env.HGV_BASE_URL;
const hgvToken = process.env.HGV_TOKEN;
module.exports.handler = wrapper(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event, null, 2)); // eslint-disable-line no-console
  const { Details: { ContactData: { PreviousContactId: contactId } } } = event;

  try {
    let hiltonGuestId;
    let confirmationNumber;
    let hrccAgentId;
    let guestCallerId;
    let queueName;
    let hotelName;
    let dnis;

    try {
      console.log('Fetching contact attributes from ctr api'); // eslint-disable-line no-console
      const ctrResponse = await request.get(`${ctrApiEndpoint}/${contactId}`);
      const ctr = ctrResponse.body;
      console.log(JSON.stringify(ctr, null, 2)); // eslint-disable-line no-console
      ({ hiltonGuestId, confirmationNumber, hrccAgentId, guestCallerId, queueName, hotelName, dnis } = (ctr.Attributes || {}));
    } catch(e) {
      console.error('Error occurred while contacting couchbase:'); // eslint-disable-line no-console
      console.error(e); // eslint-disable-line no-console
    }

    if (
        !hrccAgentId &&
        event.Details.ContactData.Attributes &&
        event.Details.ContactData.Attributes.agent
    ) {
      hrccAgentId = event.Details.ContactData.Attributes.agent;
    }

    if (
        !queueName &&
        event.Details.ContactData.Queue &&
        event.Details.ContactData.Queue.Name
    ) {
      queueName = event.Details.ContactData.Queue.Name;
    }

    if (
        !dnis &&
        event.Details.ContactData.Attributes &&
        event.Details.ContactData.Attributes.dnis
    ) {
      dnis = event.Details.ContactData.Attributes.dnis;
    }

    if (
        !dnis &&
        event.Details.ContactData.SystemEndpoint &&
        event.Details.ContactData.SystemEndpoint.Address
    ) {
      dnis = event.Details.ContactData.SystemEndpoint.Address;
    }

    if (
        !guestCallerId &&
        event.Details.ContactData.CustomerEndpoint &&
        event.Details.ContactData.CustomerEndpoint.Address
    ) {
      guestCallerId = event.Details.ContactData.CustomerEndpoint.Address;
    }

    /*
    Example payload expected:
    {
       "hiltonGuestId":"481428202",
       "confirmationNumber":"12345",
       "hrccAgentId":"abc@gmail.com",
       "guestCallerId":"8473069720",
       "dnis":"34567",
       "contactId":"12345",
       "queueName":"AIMKTInbCTDiamondDeskCTI",
       "hotelName":""HGV"
     }
     hiltonGuestId, hrccAgentId, dnis, contactId, and queueName are all required according to HGV.
     */

    console.log("Getting token"); // eslint-disable-line no-console
    const response = await request.post(`${hgvBaseUrl}/token`)
      .proxy(proxy)
      .send({
        "grant_type": "client_credentials"
      })
      .set({
        "Authorization": `Basic ${hgvToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      });
    console.log(response.body); // eslint-disable-line no-console

    const sendingToHgv = {
      hiltonGuestId,
      confirmationNumber,
      hrccAgentId,
      guestCallerId,
      contactId,
      queueName,
      hotelName,
      dnis,
    };

    console.log('Sending to HGV:', sendingToHgv); // eslint-disable-line no-console
    const transferResponse = await request.post(`${hgvBaseUrl}/partners/call-center/1.0/hilton/transfer-request`)
      .proxy(proxy)
      .set({
        'Authorization': `Bearer ${response.body.access_token}`,
      })
      .send(sendingToHgv);
    console.log("Call transfer response"); // eslint-disable-line no-console
    console.log(transferResponse.body); // eslint-disable-line no-console
    console.log(Object.assign(transferResponse.body, { lambda_success: 1 })); // eslint-disable-line no-console
  } catch (err) {
    console.log(err.response); // eslint-disable-line no-console
    throw err;
  }
});
