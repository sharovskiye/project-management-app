export const getMessage = (errorMessage: string) => {
  switch (errorMessage) {
    case 'Internal Server Error':
      return 'The data is out of date! Refresh the page.';
    default:
      return errorMessage;
  }
};
