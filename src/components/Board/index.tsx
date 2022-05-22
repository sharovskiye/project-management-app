import { memo, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { boardSelector, fetchBoard, fetchCreateColumn } from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Column } from './Сolumn';
import { useChangeOpenModalBoard } from '../../utils/CustomHook';
import { ModalWindow } from '../Modal';
import { Spinner } from '../Spinner';
import { FormTextField } from '../FormTextField';
import { getMessage } from '../../utils/getMessage';
import { getTokenWithLocalStorage } from '../../store/signInUpSlice';
import { INewColumn } from './interface';

import styles from './styles.module.scss';

interface IBoardProps {
  id: string;
}

const signUpSchema = Yup.object().shape({
  title: Yup.string().trim().required('required'),
});

export const Board = memo(({ id }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const { columns, isLoadingOnBoard, errorMessage, authorized, isError } =
    useAppSelector(boardSelector);
  const { isModalOpen, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      localStorage.clear();
      dispatch(getTokenWithLocalStorage(''));
      navigate('/');
    }
  }, [authorized, navigate, dispatch]);

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(getMessage(errorMessage), { variant: 'error' });
    }
  }, [isError, errorMessage, enqueueSnackbar]);

  const memoizedColumns = useMemo(() => {
    return [...columns]
      .sort((a, b) => a.order - b.order)
      .map((column) => (
        <div className={styles.boardColumnList} key={column.id}>
          <Column boardId={id} column={column} />
        </div>
      ));
  }, [columns, id]);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      const newColumn: INewColumn = {
        title: values.title,
        boardId: id,
      };
      dispatch(fetchCreateColumn(newColumn));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  const modal = useMemo(() => {
    return (
      isModalOpen && (
        <ModalWindow open={isModalOpen} handleClose={onCloseModal}>
          <form onSubmit={formik.handleSubmit}>
            <FormTextField
              type="text"
              label="Title"
              name="title"
              onChange={formik.handleChange}
              error={formik.errors.title}
              value={formik.values.title}
            />

            <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
              Submit
            </Button>
          </form>
        </ModalWindow>
      )
    );
  }, [
    formik.dirty,
    formik.errors.title,
    formik.handleChange,
    formik.handleSubmit,
    formik.isValid,
    formik.values.title,
    onCloseModal,
    isModalOpen,
  ]);

  return (
    <div className={`${styles.container} ${styles.containerMedium} `}>
      {isLoadingOnBoard && <Spinner />}
      <div className={styles.main}>
        <>{memoizedColumns}</>
        <div className={styles.boardNewColumn}>
          <div className={styles.buttonWrapper}>
            <button onClick={onOpenModal} className={styles.btnAddColumn}>
              <span>
                <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
              </span>
              Add new column
            </button>
          </div>
          <>{modal}</>
        </div>
      </div>
    </div>
  );
});
