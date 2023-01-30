import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { persistReducer } from 'redux-persist';

import Storage from '@/utils/Storage';

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

import {
  reducer as columnsReducer,
  saga as columnsSaga,
  actions as columnsActions,
  selectors as columnsSelector,
  routines as columnsRoutines,
} from './columns';

const authPersistConfig = {
  key: 'auth',
  keyPrefix: '',
  storage: Storage,
  whitelist: ['data'],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  desks: desksReducer,
  columns: columnsReducer,
});

export function* rootSaga() {
  yield all([authSaga(), desksSaga(), columnsSaga()]);
}

export const rootActions = {
  auth: authActions,
  desks: desksActions,
  columns: columnsActions,
};

export const rootSelectors = {
  auth: authSelector,
  desks: desksSelector,
  columns: columnsSelector,
};

export const rootRoutines = {
  auth: authRoutines,
  desks: desksRoutines,
  columns: columnsRoutines,
};
