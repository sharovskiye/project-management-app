import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Draggable } from 'react-beautiful-dnd';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useChangeOpenModalBoard, useToggle } from '../../../utils/CustomHook';
import { ConfirmModalWindow } from '../../Modal/ConfirmModal';
import { fetchDeleteTask, fetchUpdateTask } from '../../../store/boardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ModalWindow } from '../../Modal';
import { FormTextField } from '../../FormTextField';
import { ITask } from '../interface';
import { loginsSelector, usersSelector } from '../../../store/usersSlice';

import styles from './styles.module.scss';

interface ITaskProps {
  task: ITask;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('required'),
  description: Yup.string().trim().required('required'),
  user: Yup.string().trim().required('required'),
});

export const Task = memo(({ task }: ITaskProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { opened, onToggle } = useToggle();
  const { isModalOpen, onOpenModal, onCloseModal } = useChangeOpenModalBoard();
  const users = useAppSelector(usersSelector);
  const { title, description, order, userId } = task;
  const loginUsers = useAppSelector(loginsSelector);
  const currentUser = users.find((userItem) => userItem.id === userId);

  const onDelete = useCallback(() => {
    dispatch(fetchDeleteTask(task));
  }, [dispatch, task]);

  const onShowEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEdit(true);
    onOpenModal();
  };

  const onShowDetails = () => {
    setIsEdit(false);
    onOpenModal();
  };

  const onClickBtnDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle();
  };

  const formik = useFormik({
    initialValues: {
      title,
      description,
      user: currentUser?.login,
    },
    onSubmit: (values) => {
      const { title, description, user } = values;
      const selectedUser = users.find((userItem) => userItem.login === user);
      const updatedTask: ITask = { ...task, title, description, userId: selectedUser?.id || '' };
      dispatch(fetchUpdateTask(updatedTask));
    },
    validationSchema,
    enableReinitialize: true,
  });

  const modal = useMemo(
    () =>
      isModalOpen && (
        <ModalWindow open={isModalOpen} handleClose={onCloseModal}>
          <form onSubmit={formik.handleSubmit}>
            <FormTextField
              type="text"
              label={t('Title')}
              name="title"
              disabled={!isEdit}
              onChange={formik.handleChange}
              error={formik.errors.title}
              value={formik.values.title}
            />
            <FormTextField
              type="text"
              label={t('Description')}
              name="description"
              disabled={!isEdit}
              multiline
              rows={4}
              onChange={formik.handleChange}
              error={formik.errors.description}
              value={formik.values.description}
            />
            <Autocomplete
              disablePortal
              id="user"
              disabled={!isEdit}
              options={loginUsers}
              defaultValue={currentUser?.login}
              value={formik.values.user}
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
            {isEdit && (
              <Button type="submit" variant="outlined" disabled={!formik.isValid || !formik.dirty}>
                {t('Update')}
              </Button>
            )}
          </form>
          {!isEdit && (
            <div className={styles.btnEditContainer}>
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                variant="outlined"
              >
                {t('Edit')}
              </Button>
            </div>
          )}
        </ModalWindow>
      ),

    [formik, onCloseModal, isModalOpen, loginUsers, isEdit, t, currentUser?.login]
  );

  return (
    <Draggable key={task.id} draggableId={task.id} index={task.order}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div onClick={onShowDetails} className={styles.task}>
            <div className={styles.taskTitle}>
              <p title={title}>
                {t('Task')} #{order}: {title}
              </p>
              <div className={styles.taskButtons}>
                <button onClick={onShowEdit} className={`${styles.btn} ${styles.btnEdit}`}>
                  <span>
                    <EditIcon />
                  </span>
                </button>
                <button onClick={onClickBtnDelete} className={`${styles.btn} ${styles.btnDelete}`}>
                  <span>
                    <ClearOutlinedIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <ConfirmModalWindow onDelete={onDelete} open={opened} handleClose={onToggle} />
          {modal}
        </div>
      )}
    </Draggable>
  );
});
