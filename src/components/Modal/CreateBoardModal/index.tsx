import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const createBoardSchema = Yup.object().shape({
  title: Yup.string().trim().max(30).required('required'),
  description: Yup.string().trim().required('required'),
});

export const CreateBoardModal = () => {
  const dispatch = useAppDispatch();

  const { changeBoard, isModalOpen } = useAppSelector(mainBoardSelector);

  const closeBtn = useCallback(() => {
    dispatch(toggleModalVisible());
    dispatch(setChangeBoard({ id: '', title: '', description: '' }));
  }, [dispatch]);

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
    validationSchema: createBoardSchema,
    enableReinitialize: true,
  });

  return (
    <ModalWindow open={isModalOpen} handleClose={closeBtn}>
      <form onSubmit={formik.handleSubmit}>
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
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Apply
        </Button>
      </form>
    </ModalWindow>
  );
};
