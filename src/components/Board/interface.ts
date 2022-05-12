interface IFileForTask {
  filename: string;
  fileSize: number;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: IFileForTask[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[];
}
