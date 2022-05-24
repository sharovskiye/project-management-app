import { IGetPerson, IPerson } from '../services/type';

export type ISignInUpInitState = {
  token: string;
  login: string;
  setUserData: IPerson;
  getUserData: IGetPerson;
  loading: 'idle' | 'pending' | 'succeeded' | 'error';
  signConteiner: string;
  errorMessage: string;
};

export type IMainBoard = {
  modal: boolean;
  boardCollection: IGetBoard[];
  loading: 'idle' | 'pending' | 'succeeded' | 'error';
  errorMessage: string;
};

export type IGetBoard = {
  id: string;
  title: string;
  description: string;
};

export type ICreateBoard = {
  title: string;
  description: string;
};
