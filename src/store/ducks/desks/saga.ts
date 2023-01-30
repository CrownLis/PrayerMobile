import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getDesksRequest } from '@/api';
import { GetDesksResponse } from '@/types/response';
import { getDesks } from './routines';

function* getDesksWatcherSaga() {
  yield takeEvery(getDesks.TRIGGER, getDesksFlow);
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

export default function* desksWatcherSaga() {
  yield all([getDesksWatcherSaga()]);
}
