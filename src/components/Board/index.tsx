import { memo, useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import {
  columnsSelector,
  errorCodeBoardSelector,
  fetchBoard,
  fetchCreateColumn,
  isErrorBoardSelector,
  isLoadingOnBoardSelector,
} from '../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Column } from './Сolumn';
import { useChangeOpenModalBoard } from '../../utils/CustomHook';
import { ModalWindow } from '../Modal';
import { Spinner } from '../Spinner';
import { FormTextField } from '../FormTextField';
import { getMessage } from '../../utils/getMessage';
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
  const columns = useAppSelector(columnsSelector);
  const loading = useAppSelector(isLoadingOnBoardSelector);
  const { openModal, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const errorCode = useAppSelector(errorCodeBoardSelector);
  const isError = useAppSelector(isErrorBoardSelector);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  const alert = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (isError) {
      alert(getMessage(errorCode));
    }
  }, [isError, errorCode, alert]);

  const columnsMemo = useMemo(() => {
    return columns
      ? columns
          .map((column) => column)
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <div className={styles.boardColumnList} key={column.id}>
              <Column boardId={id} column={column} />
            </div>
          ))
      : null;
  }, [columns, id]);

  const findMaxOrderColumn = useCallback(() => {
    return columns ? columns.reduce((prev, { order }) => (prev > order ? prev : order), 0) : 0;
  }, [columns]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      const { title } = { ...values };
      const newColumn: INewColumn = {
        title,
        order: findMaxOrderColumn() + 1,
        boardId: id,
      };
      dispatch(fetchCreateColumn(newColumn));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  const modal = useMemo(() => {
    return openModal ? (
      <ModalWindow open={openModal} handleClose={onCloseModal}>
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
    ) : null;
  }, [
    formik.dirty,
    formik.errors.title,
    formik.handleChange,
    formik.handleSubmit,
    formik.isValid,
    formik.values.title,
    onCloseModal,
    openModal,
  ]);

  return (
    <div className={`${styles.container} ${styles.containerMedium} `}>
      {loading && <Spinner />}
      <div className={styles.main}>
        {columnsMemo}
        <div className={styles.boardNewColumn}>
          <div className={styles.buttonWrapper}>
            <button onClick={onOpenModal} className={styles.btnAddColumn}>
              <span>
                <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
              </span>
              Add new column
            </button>
          </div>
          {modal}
        </div>
      </div>
    </div>
  );
});
