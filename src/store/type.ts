import { IGetPerson, IGetToken } from '../services/type';

export type ISignUpInitState = {
  userData: IGetPerson | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type ISignInInitState = {
  token: IGetToken | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};
