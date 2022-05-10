import { ISignInInitState } from './type';

export const getDataUserSelector = (state: { signIn: ISignInInitState }) => state.signIn.userData!;
