import { IRootState } from '.';
import { IMainBoard, ISignInUpInitState } from './type';

export const getDataUserSelector = (state: { signInUp: ISignInUpInitState }) => state.signInUp;
export const boardSelector = (state: { mainBoard: IMainBoard }) => state.mainBoard;

export const tokenSelector = (state: IRootState) => state.signInUp.token;
export const loginSelector = (state: IRootState) => state.signInUp.login;
export const userNameSelector = (state: IRootState) =>
  state.users.users.find((user) => user.login === state.signInUp.login)?.name ?? '';
