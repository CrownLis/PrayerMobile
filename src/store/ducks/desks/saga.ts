import { getDesksRequest, getOwnDeskRequest } from '@/api';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getDesks, getOwnDesk } from './routines';
import { GetDesksResponse } from '@/types/response';
import { DeskType } from '@/types/data';

function* getDesksWatcherSaga() {
  yield takeEvery(getDesks.TRIGGER, getDesksFlow);
}

function* getOwnDeskWatcherSaga() {
  yield takeEvery(getOwnDesk.TRIGGER, getOwnDeskFlow);
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
    yield put(getDesks.success(response));
  } catch (error: any) {
    yield put(getDesks.failure(error.message));
  } finally {
    yield put(getDesks.fulfill());
  }
}

function* getOwnDeskFlow({ payload }: ReturnType<typeof getDesks>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    yield put(getOwnDesk.request());
    const response: DeskType = yield call(getOwnDeskRequest);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(getOwnDesk.success(response));
  } catch (error: any) {
    yield put(getOwnDesk.failure(error.message));
  } finally {
    yield put(getOwnDesk.fulfill());
  }
}

export default function* desksWatcherSaga() {
  yield all([getDesksWatcherSaga(), getOwnDeskWatcherSaga()]);
}
