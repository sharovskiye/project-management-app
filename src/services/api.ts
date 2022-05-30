import { apiBase } from '../const/const';
import { IPerson } from './type';

export const createNewPerson = async (body: IPerson) => {
  const res = await fetch(`${apiBase}/signup`, {
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
  const res = await fetch(`${apiBase}/signin`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return res;
};
