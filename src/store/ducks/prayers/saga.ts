import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  createPrayerRequest,
  deletePrayerRequest,
  doPrayRequest,
  doSubscribeRequest,
  doUnsubscribeRequest,
  getPrayerRequest,
  getPrayersRequest,
  getSubscribedPrayersRequest,
} from '@/api';
import {
  CreatePrayerResponse,
  DoPrayResponse,
  DoSubscribeResponse,
  GetPrayerResponse,
  GetPrayersResponse,
  GetSubscribedPrayersResponse,
} from '@/types/response';

import {
  cleanPrayers,
  createPrayer,
  deletePrayer,
  doPray,
  doSubscribe,
  doUnsubscribe,
  getPrayer,
  getPrayers,
  getSubscribedPrayers,
} from './routines';

function* getPrayersWatcherSaga() {
  yield takeEvery(getPrayers.TRIGGER, getPrayersFlow);
}

function* getPrayerWatcherSaga() {
  yield takeEvery(getPrayer.TRIGGER, getPrayerFlow);
}

function* getSubscribedPrayersWatcherSaga() {
  yield takeEvery(getSubscribedPrayers.TRIGGER, getSubscribedPrayersFlow);
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

function* doSubscribeWatcherSaga() {
  yield takeEvery(doSubscribe.TRIGGER, doSubscribePrayerFlow);
}

function* doUnsubscribeWatcherSaga() {
  yield takeEvery(doUnsubscribe.TRIGGER, doUnsubscribePrayerFlow);
}

function* createPrayerFlow({ payload }: ReturnType<typeof createPrayer>) {
  try {
    if (!payload) {
      throw new Error('Prayers: No payload');
    }
    yield put(createPrayer.request());
    const response: CreatePrayerResponse = yield call(createPrayerRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(createPrayer.success(response));
  } catch (error: any) {
    yield put(createPrayer.failure(error.message));
  } finally {
    yield put(createPrayer.fulfill());
  }
}

function* getPrayersFlow({ payload }: ReturnType<typeof getPrayers>) {
  try {
    if (!payload) {
      throw new Error('Prayers: No payload');
    }
    yield put(getPrayers.request());
    const response: GetPrayersResponse = yield call(getPrayersRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(getPrayers.success(response));
  } catch (error: any) {
    yield put(getPrayers.failure(error.message));
  } finally {
    yield put(getPrayers.fulfill());
  }
}

function* getPrayerFlow({ payload }: ReturnType<typeof getPrayer>) {
  try {
    if (!payload) {
      throw new Error('Prayers: No payload');
    }
    yield put(getPrayer.request());
    const response: GetPrayerResponse = yield call(getPrayerRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(getPrayer.success([response]));
  } catch (error: any) {
    yield put(getPrayer.failure(error.message));
  } finally {
    yield put(getPrayer.fulfill());
  }
}

function* getSubscribedPrayersFlow() {
  try {
    yield put(getSubscribedPrayers.request());
    const response: GetSubscribedPrayersResponse = yield call(getSubscribedPrayersRequest);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(getSubscribedPrayers.success(response));
  } catch (error: any) {
    yield put(getSubscribedPrayers.failure(error.message));
  } finally {
    yield put(getSubscribedPrayers.fulfill());
  }
}

function* doSubscribePrayerFlow({ payload }: ReturnType<typeof doSubscribe>) {
  try {
    if (!payload) {
      throw new Error('Prayers: No payload');
    }
    yield put(doSubscribe.request());
    const response: DoSubscribeResponse = yield call(doSubscribeRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(doSubscribe.success(response));
  } catch (error: any) {
    yield put(doSubscribe.failure(error.message));
  } finally {
    yield put(doSubscribe.fulfill());
  }
}

function* doUnsubscribePrayerFlow({ payload }: ReturnType<typeof doUnsubscribe>) {
  try {
    if (!payload) {
      throw new Error('Prayers: No payload');
    }
    yield put(doUnsubscribe.request());
    const response: DoSubscribeResponse = yield call(doUnsubscribeRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(doUnsubscribe.success(response));
  } catch (error: any) {
    yield put(doUnsubscribe.failure(error.message));
  } finally {
    yield put(doUnsubscribe.fulfill());
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
      throw new Error('Prayers: No payload');
    }
    yield put(doPray.request());
    const response: DoPrayResponse = yield call(doPrayRequest, payload);
    if (!response) {
      throw new Error('Prayers: Something went wrong');
    }
    yield put(doPray.success(response));
  } catch (error: any) {
    if (error?.response && error.response.data && error.response.data.statusCode) {
      yield put(doPray.failure(`${error.response.data.statusCode}`));
    } else {
      yield put(doPray.failure(error.message));
    }
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
    getPrayerWatcherSaga(),
    getSubscribedPrayersWatcherSaga(),
    createPrayerWatcherSaga(),
    cleanPrayerWatcherSaga(),
    deletePrayerWatcherSaga(),
    doPrayWatcherSaga(),
    doSubscribeWatcherSaga(),
    doUnsubscribeWatcherSaga(),
  ]);
}
