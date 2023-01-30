import { ColumnType } from '@/types/data';
import { CreateColumnPayload, DeleteColumnPayload, GetColumnsPayload } from '@/types/payload';
import { createRoutine } from 'redux-saga-routines';
import * as columnsActions from './actions';

export const getColumns = createRoutine(columnsActions.GET_COLUMNS, {
  trigger: (payload: GetColumnsPayload) => payload,
  success: (payload: ColumnType[]) => payload,
  failure: (payload: string) => payload,
});

export const getOwnColumns = createRoutine(columnsActions.GET_OWN_COLUMNS, {
  trigger: (payload: Omit<GetColumnsPayload, 'deskId'>) => payload,
  success: (payload: ColumnType[]) => payload,
  failure: (payload: string) => payload,
});

export const createColumn = createRoutine(columnsActions.CREATE_COLUMN, {
  trigger: (payload: CreateColumnPayload) => payload,
  success: (payload: void) => payload,
  failure: (payload: string) => payload,
});

export const deleteColumn = createRoutine(columnsActions.DELETE_COLUMN, {
  trigger: (payload: DeleteColumnPayload) => payload,
  success: (payload: void) => payload,
  failure: (payload: string) => payload,
});
