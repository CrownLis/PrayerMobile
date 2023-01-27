import { signInRequest, signUpRequest } from '@/api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { signIn, signUp } from './routines';
import { SignInResponse, SignUpResponse } from '@/types/response';

export function* signInWatcherSaga() {
  yield takeEvery(signIn.TRIGGER, signInFlow);
}

export function* signUpWatcherSaga() {
  yield takeEvery(signUp.TRIGGER, signUpFlow);
}

function* signInFlow({ payload }: ReturnType<typeof signIn>) {
  try {
    yield put(signIn.request());
    const response: SignInResponse = yield call(signInRequest, payload);
    if (typeof response.token === 'undefined') {
      throw new Error('Sign In: Something went wrong');
    }
    yield put(signIn.success(response));
  } catch (error: any) {
    yield put(signIn.failure(error.message));
  } finally {
    yield put(signIn.fulfill());
  }
}

function* signUpFlow({ payload }: ReturnType<typeof signUp>) {
  try {
    yield put(signUp.request());
    const response: SignUpResponse = yield call(signUpRequest, payload);
    if (response.token) {
      throw new Error('Sign In: Something went wrong');
    }
    yield put(signUp.success(response));
  } catch (error: any) {
    yield put(signUp.failure(error.message));
  } finally {
    yield put(signUp.fulfill());
  }
}
