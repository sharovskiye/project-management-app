import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IColumn, INewTask } from '../interface';
import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ModalWindow } from '../../Modal';
import { fetchCreateTask, usersSelector } from '../../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useChangeOpenModalBoard } from '../../../utils/CustomHook';
import { Autocomplete, Button, TextField } from '@mui/material';
import { FormTextField } from '../../FormTextField';
import { loginSelector } from '../../../store/selectors';

import styles from './styles.module.scss';

interface IColumnProps {
  boardId: string;
  column: IColumn;
}

const signUpSchema = Yup.object().shape({
  title: Yup.string().trim().required('required'),
  description: Yup.string().trim().required('required'),
  user: Yup.string().trim().required('required'),
});

export const Column = memo(({ boardId, column }: IColumnProps) => {
  const dispatch = useAppDispatch();
  const { tasks } = column;

  const columnsMemo = useMemo(() => {
    return tasks
      ? tasks
          .map((task) => ({ ...task, boardId, columnId: column.id }))
          .sort((a, b) => a.order - b.order)
          .map((task) => <Task task={task} key={task.id} />)
      : null;
  }, [tasks, boardId, column.id]);

  const [height, setHeight] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const { openModal, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      setHeight(refDiv.current.clientHeight);
    }
  }, [refDiv, column]);

  useEffect(() => {
    const heightColumnPercent = 0.62;
    const bodyHeight = window.innerHeight * heightColumnPercent;
    setIsScroll(bodyHeight < height);
  }, [height]);

  const findMaxOrderTask = useCallback(() => {
    return tasks ? tasks.reduce((prev, { order }) => (prev > order ? prev : order), 0) : 0;
  }, [tasks]);

  const login = useAppSelector(loginSelector);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      user: login,
    },
    onSubmit: (values) => {
      const { title, description, user } = { ...values };
      const selectedUser = users.find((userItem) => userItem.login === user);
      const newTask: INewTask = {
        title,
        order: findMaxOrderTask() + 1,
        description,
        userId: selectedUser?.id || '',
        boardId,
        columnId: column.id,
      };
      dispatch(fetchCreateTask(newTask));
      formik.resetForm();
    },
    validationSchema: signUpSchema,
  });

  const users = useAppSelector(usersSelector);
  const loginUsers = users.map((user) => user.login);

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
          <Autocomplete
            disablePortal
            id="user"
            options={loginUsers}
            defaultValue={login}
            onChange={(e, value) => {
              formik.setFieldValue('user', value || '');
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="user"
                label="User"
                helperText={formik.errors.user || ' '}
                error={Boolean(formik.errors.user)}
              />
            )}
          />
          <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
            Submit
          </Button>
        </form>
      </ModalWindow>
    ) : null;
  }, [formik, login, loginUsers, onCloseModal, openModal]);

  return (
    <div className={styles.column}>
      <div className={styles.stickyHeader}>
        <ColumnHeader column={column} />
      </div>

      <div ref={refDiv} className={isScroll ? styles.taskListScroll : undefined}>
        <div>{columnsMemo}</div>
      </div>

      <div>
        <div className={styles.buttonWrapper}>
          <button onClick={onOpenModal} className={styles.btnAddTask}>
            <span>
              <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
            </span>
            Add task
          </button>
        </div>
        {modal}
      </div>
    </div>
  );
});
