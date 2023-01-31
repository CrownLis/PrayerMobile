import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getDesksRequest } from '@/api';
import { GetDesksResponse } from '@/types/response';
import { cleanDesks, getDesks } from './routines';

function* getDesksWatcherSaga() {
  yield takeEvery(getDesks.TRIGGER, getDesksFlow);
}

function* cleanDesksWatcherSaga() {
  yield takeEvery(cleanDesks.TRIGGER, cleanDesksFlow);
}

function* getDesksFlow({ payload }: ReturnType<typeof getDesks>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    yield put(getDesks.request());
    const response: GetDesksResponse = yield call(getDesksRequest, payload);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(getDesks.success(response.data));
  } catch (error: any) {
    yield put(getDesks.failure(error.message));
  } finally {
    yield put(getDesks.fulfill());
  }
}

function* cleanDesksFlow() {
  try {
    yield put(cleanDesks.request());
    yield put(cleanDesks.success());
  } catch (error: any) {
    yield put(cleanDesks.failure(error.message));
  } finally {
    yield put(cleanDesks.fulfill());
  }
}

export default function* desksWatcherSaga() {
  yield all([getDesksWatcherSaga(), cleanDesksWatcherSaga()]);
}
