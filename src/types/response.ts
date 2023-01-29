import { ColumnDataType, DeskType } from './data';

export type SignInResponse = {
  id: number;
  email: string;
  name: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type SignUpResponse = {
  email: string;
  name: string;
  password: string;
  token: string;
  columns: ColumnDataType[];
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
};

export type GetDesksResponse = {
  data: DeskType[];
  cursor: {
    afterCursor: string;
    beforeCursor: string;
  };
};
