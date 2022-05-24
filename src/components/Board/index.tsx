import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  boardSelector,
  fetchBoard,
  fetchCreateColumn,
  fetchUpdateColumn,
  fetchUpdateTask,
  setColumns,
} from '../../store/boardSlice';
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
    // console.log(columns);

    return [...columns]
      .sort((a, b) => a.order - b.order)
      .map((column) => <Column boardId={id} column={column} key={column.id} />);
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

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, draggableId, source } = result;

      if (!destination?.droppableId) {
        return;
      }

      if (destination?.droppableId === 'columns' && destination.index !== source.index) {
        const column = columns.find((column) => column.id === draggableId);
        if (column) {
          const copyColumns = [...columns].sort((a, b) => a.order - b.order);
          const [reorderedColumn] = copyColumns.splice(source.index - 1, 1);
          copyColumns.splice(destination.index - 1, 0, reorderedColumn);
          dispatch(
            setColumns(copyColumns.map((column, index) => ({ ...column, order: index + 1 })))
          );
          dispatch(fetchUpdateColumn({ ...column, order: destination.index }));
        }
        return;
      }

      if (destination?.droppableId !== source?.droppableId || destination.index !== source.index) {
        const copyColumns = [...columns];
        const oldColumnOrder = columns.findIndex((column) => column.id === source?.droppableId);
        const newColumnOrder = columns.findIndex(
          (column) => column.id === destination?.droppableId
        );

        const copyOldColumn = copyColumns[oldColumnOrder];

        const copyNewColumn = copyColumns[newColumnOrder];

        const oldTasks = [...copyOldColumn.tasks].sort((a, b) => a.order - b.order);

        const [reorderedTask] = oldTasks.splice(source.index - 1, 1);

        if (destination?.droppableId !== source?.droppableId) {
          const newTasks = [...copyNewColumn.tasks].sort((a, b) => a.order - b.order);
          newTasks.splice(destination.index - 1, 0, reorderedTask);
          const orderedNewTask = newTasks.map((task, index) => ({
            ...task,
            order: index + 1,
          }));

          copyColumns.splice(newColumnOrder, 1, { ...copyNewColumn, tasks: orderedNewTask });
        } else {
          oldTasks.splice(destination.index - 1, 0, reorderedTask);
        }
        const orderedOldTask = oldTasks.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        copyColumns.splice(oldColumnOrder, 1, { ...copyOldColumn, tasks: orderedOldTask });

        dispatch(setColumns(copyColumns));
        const augmentedTask = {
          ...reorderedTask,
          order: destination.index ? destination.index : 1,
          columnId: destination?.droppableId,
          oldColumnId: source?.droppableId,
        };
        dispatch(fetchUpdateTask(augmentedTask));
        return;
      }
    },
    [dispatch, columns]
  );

  return (
    <div className={`${styles.container} ${styles.containerMedium} `}>
      {isLoadingOnBoard && <Spinner />}
      <div className={styles.main}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable direction="horizontal" droppableId="columns">
            {(provided) => (
              <div className={styles.columns} ref={provided.innerRef} {...provided.droppableProps}>
                {memoizedColumns}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
