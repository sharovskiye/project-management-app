import { memo, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Autocomplete, Button, TextField } from '@mui/material';

import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ModalWindow } from '../../Modal';
import { fetchCreateTask, usersSelector } from '../../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useChangeOpenModalBoard } from '../../../utils/CustomHook';
import { FormTextField } from '../../FormTextField';
import { loginSelector } from '../../../store/selectors';
import { IColumn, INewTask } from '../interface';

import styles from './styles.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';

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
  const { tasks } = column;
  const { isModalOpen, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const dispatch = useAppDispatch();
  const login = useAppSelector(loginSelector);
  const users = useAppSelector(usersSelector);
  const loginUsers = users.map((user) => user.login);

  const memoizedTasks = useMemo(() => {
    return tasks
      .map((task) => ({ ...task, boardId, columnId: column.id }))
      .sort((a, b) => a.order - b.order)
      .map((task) => <Task task={task} key={task.id} />);
  }, [tasks, boardId, column.id]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      user: login,
    },
    onSubmit: (values) => {
      const { title, description, user } = values;
      const selectedUser = users.find((userItem) => userItem.login === user);
      const newTask: INewTask = {
        title,
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
      )
    );
  }, [formik, login, loginUsers, onCloseModal, isModalOpen]);

  return (
    <Draggable key={column.id} draggableId={column.id} index={column.order}>
      {(provided) => (
        <Droppable type="tasks" droppableId={column.id}>
          {(providedTasks) => (
            <div>
              <div ref={provided.innerRef} {...provided.draggableProps}>
                <div className={styles.column}>
                  <div className={styles.draggable} {...provided.dragHandleProps}></div>
                  <div className={styles.stickyHeader}>
                    <ColumnHeader column={column} />
                  </div>

                  <div className={styles.container}>
                    <div
                      ref={providedTasks.innerRef}
                      {...providedTasks.droppableProps}
                      className={styles.taskList}
                    >
                      <>{memoizedTasks}</>
                    </div>

                    <div>
                      <div className={styles.buttonWrapper}>
                        <button onClick={onOpenModal} className={styles.btnAddTask}>
                          <span>
                            <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
                          </span>
                          Add new task
                        </button>
                      </div>
                    </div>
                    <>{modal}</>
                  </div>
                </div>
              </div>
              {providedTasks.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </Draggable>
  );
});
