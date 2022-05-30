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
  const [isModalOpen, setIsModalOpen] = useState(initialValue);
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(isOpenModalSelector);

  useEffect(() => {
    if (!isOpenModal) {
      setIsModalOpen(false);
    }
  }, [isOpenModal]);

  const onOpenModal = useCallback(() => {
    dispatch(setIsOpenModal(true));
    setIsModalOpen(true);
  }, [dispatch, setIsModalOpen]);

  const onCloseModal = useCallback(() => {
    dispatch(setIsOpenModal(false));
    setIsModalOpen(false);
  }, [dispatch, setIsModalOpen]);

  return { isModalOpen, onOpenModal, onCloseModal };
};
