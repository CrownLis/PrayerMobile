import { ColumnData } from './data';

export type SignInResponse = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: number;
  email: string;
  name: string;
  token: string;
};

export type SignUpResponse = {
  email: string;
  name: string;
  password: string;
  token: string;
  columns: ColumnData[];
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
};
