const { successResponse } = require('../../utils/lambda-response');

describe('index', () => {
  it('executes as expected', () => {
    const response = successResponse({
      message: 'Go Serverless! Your function executed successfully!',
      statusCode: 200,
    });
    expect(response.statusCode).toMatchSnapshot();
  });
});
