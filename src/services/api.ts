import { IPerson } from './type';

const baseLink = 'https://pma-team22.herokuapp.com';

export const createNewPerson = async (body: IPerson) => {
  const res = await fetch(`${baseLink}/signup`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return res;
};

export const signIn = async (body: IPerson) => {
  const res = await fetch(`${baseLink}/signin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return res;
};
