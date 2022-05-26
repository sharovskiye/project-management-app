import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FormTextField } from '../../FormTextField';
import { useAppDispatch } from '../../../store/hooks';
import { toggleModalVisible, fetchCreateBoard } from '../../../store/mainBoardSlice';

import styles from './styles.module.scss';

const createBoardSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, 'Too Short!').max(20, 'Too Long!').required('required'),
  description: Yup.string().trim().min(5, 'Too Short!').max(1000, 'Too Long!').required('required'),
});

export const CreateBoardModal = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      const dataBoard = { ...values };
      dispatch(toggleModalVisible());
      dispatch(fetchCreateBoard(dataBoard));
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
        <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
          Apply
        </Button>
      </form>
    </div>
  );
};
