import { IRootState } from '.';
import { ISignInUpInitState } from './type';

export const getDataUserSelector = (state: { signInUp: ISignInUpInitState }) => state.signInUp;

export const tokenSelector = (state: IRootState) => state.signInUp.token;
export const loginSelector = (state: IRootState) => state.signInUp.login;
