import { IGetPerson } from '../services/type';
import { ISignInInitState, ISignUpInitState } from './type';

export const getDataUserSelector = (state: { signIn: ISignInInitState }) => state.signIn.userData!;
