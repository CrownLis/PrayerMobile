import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createPrayerRequest, getPrayersRequest } from '@/api';
import { CreatePrayerResponse, GetPrayersResponse } from '@/types/response';
import { cleanPrayers, createPrayer, getPrayers } from './routines';

function* getPrayersWatcherSaga() {
  yield takeEvery(getPrayers.TRIGGER, getPraysFlow);
}

function* createPrayerWatcherSaga() {
  yield takeEvery(createPrayer.TRIGGER, createPrayerFlow);
}

function* cleanPrayerWatcherSaga() {
  yield takeEvery(cleanPrayers.TRIGGER, cleanPrayersFlow);
}

function* createPrayerFlow({ payload }: ReturnType<typeof createPrayer>) {
  try {
    console.log(1);
    if (!payload) {
      throw new Error('Columns: No payload');
    }
    yield put(createPrayer.request());
    console.log(3);
    const response: CreatePrayerResponse = yield call(createPrayerRequest, payload);
    console.log(4);
    if (!response) {
      throw new Error('Columns: Something went wrong');
    }
    yield put(createPrayer.success(response));
  } catch (error: any) {
    yield put(createPrayer.failure(error.message));
  } finally {
    yield put(createPrayer.fulfill());
  }
}

function* getPraysFlow({ payload }: ReturnType<typeof getPrayers>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    console.log(payload);
    yield put(getPrayers.request());
    const response: GetPrayersResponse = yield call(getPrayersRequest, payload);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(getPrayers.success(response));
  } catch (error: any) {
    yield put(getPrayers.failure(error.message));
  } finally {
    yield put(getPrayers.fulfill());
  }
}

function* cleanPrayersFlow() {
  try {
    yield put(cleanPrayers.request());
    yield put(cleanPrayers.success());
  } catch (error: any) {
    yield put(cleanPrayers.failure(error.message));
  } finally {
    yield put(cleanPrayers.fulfill());
  }
}

export default function* desksWatcherSaga() {
  yield all([getPrayersWatcherSaga(), createPrayerWatcherSaga(), cleanPrayerWatcherSaga()]);
}
