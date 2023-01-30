import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createColumnRequest, getColumnsRequest, getOwnDeskRequest } from '@/api';
import { CreateColumnResponse, GetColumnsResponse, GetOwnDeskResponse } from '@/types/response';
import { getOwnColumns, getColumns, createColumn } from './routines';

function* getColumnsWatcherSaga() {
  yield takeEvery(getColumns.TRIGGER, getColumnsFlow);
}

function* getOwnColumnsWatcherSaga() {
  yield takeEvery(getOwnColumns.TRIGGER, getOwnColumnsFlow);
}

function* createColumnWatcherSaga() {
  yield takeEvery(createColumn.TRIGGER, createColumnFlow);
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
    yield put(createColumn.success());
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

export default function* columnsWatcherSaga() {
  yield all([getColumnsWatcherSaga(), getOwnColumnsWatcherSaga(), createColumnWatcherSaga()]);
}
