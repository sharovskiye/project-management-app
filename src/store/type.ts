import { IGetPerson, IGetToken, IPerson } from '../services/type';

export type ISignUpInitState = {
  userData: IGetPerson | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

export type ISignInInitState = {
  token: IGetToken | null;
  userData: IPerson | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};
