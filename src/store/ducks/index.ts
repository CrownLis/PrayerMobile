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

import {
  reducer as desksReducer,
  saga as desksSaga,
  actions as desksActions,
  selectors as desksSelector,
  routines as desksRoutines,
} from './desks';

const authPersistConfig = {
  key: 'auth',
  keyPrefix: '',
  storage: AsyncStorage,
  whitelist: ['data'],
};

const desksPersistConfig = {
  key: 'desks',
  keyPrefix: '',
  storage: AsyncStorage,
  whitelist: ['data'],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  desks: persistReducer(desksPersistConfig, desksReducer),
});

export function* rootSaga() {
  yield all([authSaga(), desksSaga()]);
}

export const rootActions = {
  auth: authActions,
  desks: desksActions,
};

export const rootSelectors = {
  auth: authSelector,
  desks: desksSelector,
};

export const rootRoutines = {
  auth: authRoutines,
  desks: desksRoutines,
};
