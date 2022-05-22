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
