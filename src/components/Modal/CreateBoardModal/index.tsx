import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { FormTextField } from '../../FormTextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  toggleModalVisible,
  fetchCreateBoard,
  setChangeBoard,
  fetchChangeBoard,
} from '../../../store/mainBoardSlice';
import { mainBoardSelector } from '../../../store/selectors';
import { ModalWindow } from '..';

export const CreateBoardModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { changeBoard, isModalOpen } = useAppSelector(mainBoardSelector);

  const closeBtn = useCallback(() => {
    dispatch(toggleModalVisible());
    dispatch(setChangeBoard({ id: '', title: '', description: '' }));
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().max(30, t('Too Long!')).required(t('Required!')),
    description: Yup.string().trim().required(t('Required!')),
  });

  const formik = useFormik({
    initialValues: {
      title: changeBoard.title,
      description: changeBoard.description,
    },
    onSubmit: (values) => {
      const dataBoard = { ...values };

      if (changeBoard.id) {
        const fullDataBoard = { ...dataBoard, id: changeBoard.id };

        dispatch(fetchChangeBoard(fullDataBoard));
      } else {
        dispatch(fetchCreateBoard(dataBoard));
      }

      dispatch(toggleModalVisible());
      dispatch(setChangeBoard({ id: '', title: '', description: '' }));
      formik.resetForm();
    },
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <ModalWindow open={isModalOpen} handleClose={closeBtn}>
      <form onSubmit={formik.handleSubmit}>
        <FormTextField
          type="text"
          label={t('Title')}
          name="title"
          onChange={formik.handleChange}
          error={formik.errors.title}
          value={formik.values.title}
        />
        <FormTextField
          type="text"
          label={t('Description')}
          name="description"
          multiline
          rows={4}
          onChange={formik.handleChange}
          error={formik.errors.description}
          value={formik.values.description}
        />
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          {t(changeBoard.id ? 'Update' : 'Create')}
        </Button>
      </form>
    </ModalWindow>
  );
};
