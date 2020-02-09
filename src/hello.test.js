// import hello from './hello';
const { successResponse } = require('./utils');

describe('hello', () => {
  it('executes as expected', () => {
    const response = successResponse({
      message: 'Go Serverless! Your function executed successfully!',
      statusCode: 200,
    });
    expect(response.statusCode).toMatchSnapshot();
  });
});
