import { useState, useCallback, useEffect } from 'react';
import { isOpenModalSelector, setIsOpenModal } from '../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function useToggle(initialValue = false) {
  const [opened, setOpened] = useState(initialValue);

  const onToggle = useCallback(() => {
    setOpened((prevValue) => !prevValue);
  }, []);

  return { opened, onToggle };
}

export const useChangeOpenModalBoard = (initialValue = false) => {
  const [openModal, setOpenModal] = useState(initialValue);
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(isOpenModalSelector);

  useEffect(() => {
    if (!isOpenModal) {
      setOpenModal(false);
    }
  }, [isOpenModal]);

  const onOpenModal = useCallback(() => {
    dispatch(setIsOpenModal(true));
    setOpenModal(true);
  }, [dispatch, setOpenModal]);

  const onCloseModal = useCallback(() => {
    dispatch(setIsOpenModal(false));
    setOpenModal(false);
  }, [dispatch, setOpenModal]);

  return { openModal, onOpenModal, onCloseModal };
};
