import { memo, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Task } from '../Task';
import { ColumnHeader } from './Header';
import { ModalWindow } from '../../Modal';
import { fetchCreateTask } from '../../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useChangeOpenModalBoard } from '../../../utils/CustomHook';
import { FormTextField } from '../../FormTextField';
import { loginSelector } from '../../../store/selectors';
import { IColumn, INewTask } from '../interface';
import { usersSelector } from '../../../store/usersSlice';

import styles from './styles.module.scss';

interface IColumnProps {
  boardId: string;
  column: IColumn;
}

export const Column = memo(({ boardId, column }: IColumnProps) => {
  const { t } = useTranslation();
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

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required(t('form.required')),
    description: Yup.string().trim().required(t('form.required')),
    user: Yup.string().trim().required(t('form.required')),
  });

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
    validationSchema,
  });

  const modal = useMemo(() => {
    return (
      isModalOpen && (
        <ModalWindow open={isModalOpen} handleClose={onCloseModal}>
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
                  label={t('User')}
                  helperText={formik.errors.user || ' '}
                  error={Boolean(formik.errors.user)}
                />
              )}
            />
            <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
              {t('Create')}
            </Button>
          </form>
        </ModalWindow>
      )
    );
  }, [formik, login, loginUsers, onCloseModal, isModalOpen, t]);

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
                      {memoizedTasks}
                    </div>

                    <div>
                      <div className={styles.buttonWrapper}>
                        <button onClick={onOpenModal} className={styles.btnAddTask}>
                          <span>
                            <AddCircleOutlineOutlinedIcon className={styles.iconAdd} />
                          </span>
                          {t('board.Add new task')}
                        </button>
                      </div>
                    </div>
                    {modal}
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
