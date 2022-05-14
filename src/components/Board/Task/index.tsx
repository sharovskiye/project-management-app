import { memo } from 'react';
import { ITask } from '../interface';

interface ITaskProps {
  task: ITask;
}

export const Task = memo(({ task }: ITaskProps) => {
  const { title, order } = task;
  return (
    <div>
      Task #{order}: {title}
    </div>
  );
});
