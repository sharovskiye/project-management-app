import { memo, useMemo } from 'react';
import { IColumn } from '../interface';
import { Task } from '../Task';

interface IColumnProps {
  column: IColumn;
}

export const Column = memo(({ column }: IColumnProps) => {
  const { title, tasks } = column;
  const columnsMemo = useMemo(() => {
    return tasks ? tasks.map((task) => <Task task={task} key={task.id} />) : null;
  }, [tasks]);
  console.log('render');

  return (
    <div>
      Column: {title}
      <div>{columnsMemo}</div>
    </div>
  );
});
