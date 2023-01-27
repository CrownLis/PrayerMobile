import { signInRequest, signUpRequest } from '@/api';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { signIn, signUp } from './routines';
import { SignInResponse, SignUpResponse } from '@/types/response';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* signInWatcherSaga() {
  yield takeEvery(signIn.TRIGGER, signInFlow);
}

function* signUpWatcherSaga() {
  yield takeEvery(signUp.TRIGGER, signUpFlow);
}

function* signInFlow({ payload }: ReturnType<typeof signIn>) {
  try {
    if (!payload) {
      throw new Error('Sign Up: No payload');
    }
    yield put(signIn.request());
    const response: SignInResponse = yield call(signInRequest, payload);
    if (typeof response.token === 'undefined') {
      throw new Error('Sign In: Something went wrong');
    }
    AsyncStorage.setItem('token', response.token);
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
    if (response.token) {
      throw new Error('Sign In: Something went wrong');
    }
    AsyncStorage.setItem('token', response.token);
    yield put(signUp.success(response));
  } catch (error: any) {
    yield put(signUp.failure(error.message));
  } finally {
    yield put(signUp.fulfill());
  }
}

export default function* authWatcherSaga() {
  yield all([signInWatcherSaga(), signUpWatcherSaga()]);
}
