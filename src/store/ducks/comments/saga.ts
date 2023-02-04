import { getCommentsRequest } from '@/api';
import { getCommentsResponse } from '@/types/response';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getComments } from './routines';

function* getCommentsWatcherSaga() {
  yield takeEvery(getComments.TRIGGER, getCommentsFlow);
}

function* getCommentsFlow({ payload }: ReturnType<typeof getComments>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    yield put(getComments.request());
    const response: getCommentsResponse = yield call(getCommentsRequest, payload);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(getComments.success(response));
  } catch (error: any) {
    yield put(getComments.failure(error.message));
  } finally {
    yield put(getComments.fulfill());
  }
}

export default function* commentsWatcherSaga() {
  yield all([getCommentsWatcherSaga()]);
}
