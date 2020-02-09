const { successResponse } = require('../utils/lambda-response');

describe('index', () => {
  it('executes as expected', () => {
    const response = successResponse({
      message: 'Your API request has excuted successfully!',
      statusCode: 200,
    });
    expect(response.statusCode).toMatchSnapshot();
  });
});
