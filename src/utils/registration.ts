export const getMessage = (codeError: unknown) => {
  switch (codeError) {
    case '403':
      return 'User was not founded!';
    case '409':
      return 'User login already exists!';
    default:
      return null;
  }
};
