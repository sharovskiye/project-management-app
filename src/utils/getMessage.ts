export const getMessage = (codeError: unknown) => {
  switch (codeError) {
    case '403':
      return 'User was not founded!';
    case '409':
      return 'User login already exists!';
    case '400':
      return 'Data is incorrect!';
    default:
      return 'The data is out of date! Refresh the page.';
  }
};
