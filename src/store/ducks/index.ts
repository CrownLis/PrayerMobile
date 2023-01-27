import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { persistReducer } from 'redux-persist';

import {
  reducer as authReducer,
  saga as authSaga,
  actions as authActions,
  selectors as authSelector,
  routines as authRoutines,
} from './auth';

const authPersistConfig = {
  key: 'auth',
  keyPrefix: '',
  storage: AsyncStorage,
  whitelist: ['data'],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export const rootActions = {
  auth: authActions,
};

export const rootSelectors = {
  auth: authSelector,
};

export const rootRoutines = {
  auth: authRoutines,
};
