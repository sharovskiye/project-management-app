export type IPerson = {
  name?: string;
  login: string;
  password: string;
};

export type IGetPerson = {
  id: string;
  name: string;
  login: string;
};

export type IGetToken = {
  token: string;
};
