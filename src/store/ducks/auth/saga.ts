import { all, call, put, takeEvery } from 'redux-saga/effects';

import { signInRequest, signUpRequest } from '@/api';
import { SignInResponse, SignUpResponse } from '@/types/response';
import Storage from '@/utils/Storage';
import { logOut, signIn, signUp } from './routines';

function* signInWatcherSaga() {
  yield takeEvery(signIn.TRIGGER, signInFlow);
}

function* signUpWatcherSaga() {
  yield takeEvery(signUp.TRIGGER, signUpFlow);
}

function* logOutWatcherSaga() {
  yield takeEvery(logOut.TRIGGER, logOutFlow);
}

function* signInFlow({ payload }: ReturnType<typeof signIn>) {
  try {
    if (!payload) {
      throw new Error('Sign In: No payload');
    }
    yield put(signIn.request());
    const response: SignInResponse = yield call(signInRequest, payload);
    if (!response) {
      throw new Error('Sign In: Something went wrong');
    }
    yield call(Storage.setItem, 'token', response.token);
    yield put(signIn.success(response));
  } catch (error: any) {
    yield put(signIn.failure(error.message));
  } finally {
    yield put(signIn.fulfill());
  }
}

function* signUpFlow({ payload }: ReturnType<typeof signUp>) {
  try {
    if (!payload) {
      throw new Error('Sign Up: No payload');
    }
    yield put(signUp.request());
    const response: SignUpResponse = yield call(signUpRequest, payload);
    if (!response) {
      throw new Error('Sign Up: Something went wrong');
    }
    yield call(Storage.setItem, 'token', response.token);
    yield put(signUp.success(response));
  } catch (error: any) {
    yield put(signUp.failure(error.message));
  } finally {
    yield put(signUp.fulfill());
  }
}

function* logOutFlow() {
  try {
    yield put(logOut.request());
    yield call(Storage.removeItem, 'token');
    yield put(logOut.success());
  } catch (error: any) {
    yield put(logOut.failure(error.message));
  } finally {
    yield put(logOut.fulfill());
  }
}

export default function* authWatcherSaga() {
  yield all([signInWatcherSaga(), signUpWatcherSaga(), logOutWatcherSaga()]);
}
