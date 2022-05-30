import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { IRootState, IAppDispatch } from '.';

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
