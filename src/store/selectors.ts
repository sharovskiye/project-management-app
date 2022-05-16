import { ISignInUpInitState } from './type';

export const getDataUserSelector = (state: { signInUp: ISignInUpInitState }) => state.signInUp;
