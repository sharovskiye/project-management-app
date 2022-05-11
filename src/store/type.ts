import { IGetPerson, IPerson } from '../services/type';

export type ISignUpInitState = {
  userData: IGetPerson;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type ISignInInitState = {
  token: string;
  userData: IPerson;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};
