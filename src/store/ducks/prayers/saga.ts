import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createPrayerRequest, deletePrayerRequest, doPrayRequest, getPrayersRequest } from '@/api';
import { CreatePrayerResponse, DoPrayResponse, GetPrayersResponse } from '@/types/response';
import { cleanPrayers, createPrayer, deletePrayer, doPray, getPrayers } from './routines';

function* getPrayersWatcherSaga() {
  yield takeEvery(getPrayers.TRIGGER, getPraysFlow);
}

function* createPrayerWatcherSaga() {
  yield takeEvery(createPrayer.TRIGGER, createPrayerFlow);
}

function* deletePrayerWatcherSaga() {
  yield takeEvery(deletePrayer.TRIGGER, deletePrayerFlow);
}

function* doPrayWatcherSaga() {
  yield takeEvery(doPray.TRIGGER, doPrayFlow);
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

function* deletePrayerFlow({ payload }: ReturnType<typeof deletePrayer>) {
  try {
    yield put(deletePrayer.request());
    yield call(deletePrayerRequest, payload);
    yield put(deletePrayer.success(payload));
  } catch (error: any) {
    yield put(deletePrayer.failure(error.message));
  } finally {
    yield put(deletePrayer.fulfill());
  }
}

function* doPrayFlow({ payload }: ReturnType<typeof doPray>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    yield put(doPray.request());
    const response: DoPrayResponse = yield call(doPrayRequest, payload);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(doPray.success(response));
  } catch (error: any) {
    yield put(doPray.failure(error.message));
  } finally {
    yield put(doPray.fulfill());
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

export default function* prayersWatcherSaga() {
  yield all([
    getPrayersWatcherSaga(),
    createPrayerWatcherSaga(),
    cleanPrayerWatcherSaga(),
    deletePrayerWatcherSaga(),
    doPrayWatcherSaga(),
  ]);
}
