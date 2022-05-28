import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FormTextField } from '../../FormTextField';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  toggleModalVisible,
  fetchCreateBoard,
  setIdChangedBoard,
  fetchChangeBoard,
} from '../../../store/mainBoardSlice';

import styles from './styles.module.scss';
import { useCallback } from 'react';
import { boardSelector } from '../../../store/selectors';

const createBoardSchema = Yup.object().shape({
  title: Yup.string().trim().max(30).required('required'),
  description: Yup.string().trim().required('required'),
});

export const CreateBoardModal = () => {
  const dispatch = useAppDispatch();

  const { idChangedBoard } = useAppSelector(boardSelector);

  const closeBtn = useCallback(() => {
    dispatch(toggleModalVisible());
    dispatch(setIdChangedBoard(''));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      const dataBoard = { ...values };

      if (idChangedBoard) {
        const fullDataBoard = { ...dataBoard, id: idChangedBoard };

        dispatch(fetchChangeBoard(fullDataBoard));
      } else {
        dispatch(fetchCreateBoard(dataBoard));
      }

      dispatch(toggleModalVisible());
      formik.resetForm();
    },
    validationSchema: createBoardSchema,
  });

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <FormTextField
          type="text"
          label="Title"
          name="title"
          onChange={formik.handleChange}
          error={formik.errors.title}
          value={formik.values.title}
        />
        <FormTextField
          type="text"
          label="Description"
          name="description"
          multiline
          rows={4}
          onChange={formik.handleChange}
          error={formik.errors.description}
          value={formik.values.description}
        />
        <button className={styles.closeBtn} onClick={closeBtn}>
          ✖
        </button>
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Apply
        </Button>
      </form>
    </div>
  );
};
