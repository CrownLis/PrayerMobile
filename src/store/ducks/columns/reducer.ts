import { BaseState, createReducer } from '@/store/createReducer';
import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { ColumnType } from '@/types/data';

import { cleanColumns, createColumn, deleteColumn, getColumns, getOwnColumns } from './routines';

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
  [createColumn.SUCCESS]: (state: ColumnsStateType, action: ReturnType<typeof createColumn.success>) => ({
    ...state,
    data: [action.payload, ...(state.data || [])],
  }),
  ...handleFailure<ColumnsStateType, { payload: string }>(createColumn),
  ...handleFulfill<ColumnsStateType>(createColumn),
};

const handleDeleteColumn = {
  ...handleTrigger<ColumnsStateType>(deleteColumn),
  ...handleRequest<ColumnsStateType>(deleteColumn),
  [deleteColumn.SUCCESS]: (state: ColumnsStateType, action: ReturnType<typeof deleteColumn.success>) => {
    if (!state.data) {
      return state;
    }
    return {
      ...state,
      data: state.data.filter((column) => column.id !== action.payload),
    };
  },
  ...handleFailure<ColumnsStateType, { payload: string }>(deleteColumn),
  ...handleFulfill<ColumnsStateType>(deleteColumn),
};

const handleCleanColumns = {
  [cleanColumns.SUCCESS]: (state: ColumnsStateType) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

const desksReducer = createReducer(initialState)({
  ...handleGetColumns,
  ...handleGetOwnColumns,
  ...handleCreateColumn,
  ...handleDeleteColumn,
  ...handleCleanColumns,
});

export default desksReducer;
