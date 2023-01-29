export type ColumnDataType = {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type UserType = Record<string, any>;

export type DeskType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
};
