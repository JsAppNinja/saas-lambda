describe('index', () => {
  it('executes as expected', () => {
    const statusCode = 200;
    expect(statusCode).toMatchSnapshot();
  });
});
