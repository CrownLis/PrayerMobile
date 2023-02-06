import { all, call, put, takeEvery } from 'redux-saga/effects';

import { createCommentsRequest, getCommentsRequest } from '@/api';
import { createCommentResponse, GetCommentsResponse } from '@/types/response';

import { cleanComments, createComment, getComments } from './routines';

function* getCommentsWatcherSaga() {
  yield takeEvery(getComments.TRIGGER, getCommentsFlow);
}

function* createCommentWatcherSaga() {
  yield takeEvery(createComment.TRIGGER, createCommentFlow);
}

function* cleanCommentsWatcherSaga() {
  yield takeEvery(cleanComments.TRIGGER, cleanCommentsFlow);
}

function* getCommentsFlow({ payload }: ReturnType<typeof getComments>) {
  try {
    if (!payload) {
      throw new Error('Desks: No payload');
    }
    yield put(getComments.request());
    const response: GetCommentsResponse = yield call(getCommentsRequest, payload);
    if (!response) {
      throw new Error('Desks: Something went wrong');
    }
    yield put(getComments.success(response.data));
  } catch (error: any) {
    yield put(getComments.failure(error.message));
  } finally {
    yield put(getComments.fulfill());
  }
}

function* createCommentFlow({ payload }: ReturnType<typeof createComment>) {
  try {
    if (!payload) {
      throw new Error('Columns: No payload');
    }
    yield put(createComment.request());
    const response: createCommentResponse = yield call(createCommentsRequest, payload);
    if (!response) {
      throw new Error('Columns: Something went wrong');
    }
    yield put(createComment.success(response));
  } catch (error: any) {
    yield put(createComment.failure(error.message));
  } finally {
    yield put(createComment.fulfill());
  }
}

function* cleanCommentsFlow() {
  try {
    yield put(cleanComments.request());
    yield put(cleanComments.success());
  } catch (error: any) {
    yield put(cleanComments.failure(error.message));
  } finally {
    yield put(cleanComments.fulfill());
  }
}

export default function* commentsWatcherSaga() {
  yield all([getCommentsWatcherSaga(), createCommentWatcherSaga(), cleanCommentsWatcherSaga()]);
}
