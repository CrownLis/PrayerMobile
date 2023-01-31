import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createColumnRequest, getColumnsRequest, getOwnDeskRequest, removeColumnRequest } from '@/api';
import { CreateColumnResponse, GetColumnsResponse, GetOwnDeskResponse } from '@/types/response';
import { getOwnColumns, getColumns, createColumn, deleteColumn, cleanColumns } from './routines';

function* getColumnsWatcherSaga() {
  yield takeEvery(getColumns.TRIGGER, getColumnsFlow);
}

function* getOwnColumnsWatcherSaga() {
  yield takeEvery(getOwnColumns.TRIGGER, getOwnColumnsFlow);
}

function* createColumnWatcherSaga() {
  yield takeEvery(createColumn.TRIGGER, createColumnFlow);
}

function* deleteColumnWatcherSaga() {
  yield takeEvery(deleteColumn.TRIGGER, deleteColumnFlow);
}

function* cleanColumnsWatcherSaga() {
  yield takeEvery(cleanColumns.TRIGGER, cleanColumnsFlow);
}

function* getColumnsFlow({ payload }: ReturnType<typeof getColumns>) {
  try {
    if (!payload) {
      throw new Error('Columns: No payload');
    }
    yield put(getColumns.request());
    const response: GetColumnsResponse = yield call(getColumnsRequest, payload);
    if (!response) {
      throw new Error('Columns: Something went wrong');
    }
    yield put(getColumns.success(response.data));
  } catch (error: any) {
    yield put(getColumns.failure(error.message));
  } finally {
    yield put(getColumns.fulfill());
  }
}

function* createColumnFlow({ payload }: ReturnType<typeof createColumn>) {
  try {
    if (!payload) {
      throw new Error('Columns: No payload');
    }
    yield put(createColumn.request());
    const response: CreateColumnResponse = yield call(createColumnRequest, payload);
    if (!response) {
      throw new Error('Columns: Something went wrong');
    }
    yield put(createColumn.success(response));
  } catch (error: any) {
    yield put(createColumn.failure(error.message));
  } finally {
    yield put(createColumn.fulfill());
  }
}

function* getOwnColumnsFlow({ payload }: ReturnType<typeof getOwnColumns>) {
  try {
    if (!payload) {
      throw new Error('Columns: No payload');
    }
    yield put(getOwnColumns.request());
    const { id }: GetOwnDeskResponse = yield call(getOwnDeskRequest);
    const response: GetColumnsResponse = yield call(getColumnsRequest, {
      ...payload,
      deskId: id,
    });
    if (!response) {
      throw new Error('Columns: Something went wrong');
    }
    yield put(getOwnColumns.success(response.data));
  } catch (error: any) {
    yield put(getOwnColumns.failure(error.message));
  } finally {
    yield put(getOwnColumns.fulfill());
  }
}

function* deleteColumnFlow({ payload }: ReturnType<typeof deleteColumn>) {
  try {
    yield put(deleteColumn.request());
    yield call(removeColumnRequest, payload);
    yield put(deleteColumn.success(payload));
  } catch (error: any) {
    yield put(deleteColumn.failure(error.message));
  } finally {
    yield put(deleteColumn.fulfill());
  }
}

function* cleanColumnsFlow() {
  try {
    yield put(cleanColumns.request());
    yield put(cleanColumns.success());
  } catch (error: any) {
    yield put(cleanColumns.failure(error.message));
  } finally {
    yield put(cleanColumns.fulfill());
  }
}

export default function* columnsWatcherSaga() {
  yield all([
    getColumnsWatcherSaga(),
    getOwnColumnsWatcherSaga(),
    createColumnWatcherSaga(),
    deleteColumnWatcherSaga(),
    cleanColumnsWatcherSaga(),
  ]);
}
