import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { BaseState, createReducer } from '@/store/createReducer';

import { ColumnType } from '@/types/data';

import { createColumn, getColumns, getOwnColumns } from './routines';

type ColumnsStateType = BaseState<ColumnType[]>;

const initialState: ColumnsStateType = {
  data: null,
  loading: false,
  error: null,
};

const handleGetColumns = {
  ...handleTrigger<ColumnsStateType>(getColumns),
  ...handleRequest<ColumnsStateType>(getColumns),
  ...handleSuccess<ColumnsStateType, { payload: ColumnType[] }>(getColumns),
  ...handleFailure<ColumnsStateType, { payload: string }>(getColumns),
  ...handleFulfill<ColumnsStateType>(getColumns),
};

const handleGetOwnColumns = {
  ...handleTrigger<ColumnsStateType>(getOwnColumns),
  ...handleRequest<ColumnsStateType>(getOwnColumns),
  ...handleSuccess<ColumnsStateType, { payload: ColumnType[] }>(getOwnColumns),
  ...handleFailure<ColumnsStateType, { payload: string }>(getOwnColumns),
  ...handleFulfill<ColumnsStateType>(getOwnColumns),
};

const handleCreateColumn = {
  ...handleTrigger<ColumnsStateType>(createColumn),
  ...handleRequest<ColumnsStateType>(createColumn),
  [createColumn.SUCCESS]: (state: ColumnsStateType) => ({
    ...state,
  }),
  ...handleFailure<ColumnsStateType, { payload: string }>(createColumn),
  ...handleFulfill<ColumnsStateType>(createColumn),
};

const desksReducer = createReducer(initialState)({
  ...handleGetColumns,
  ...handleGetOwnColumns,
  ...handleCreateColumn,
});

export default desksReducer;
