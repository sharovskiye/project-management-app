import { IGetPerson } from '../services/type';

export type ISignUpInitState = {
  userData: IGetPerson | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};
