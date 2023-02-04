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

import {
  reducer as prayersReducer,
  saga as prayersSaga,
  actions as prayersActions,
  selectors as prayersSelector,
  routines as prayersRoutines,
} from './prayers';

import {
  reducer as commentsReducer,
  saga as commentsSaga,
  actions as commentsActions,
  selectors as commentsSelector,
  routines as commentsRoutines,
} from './comments';

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
  prayers: prayersReducer,
  comments: commentsReducer,
});

export function* rootSaga() {
  yield all([authSaga(), desksSaga(), columnsSaga(), prayersSaga(), commentsSaga()]);
}

export const rootActions = {
  auth: authActions,
  desks: desksActions,
  columns: columnsActions,
  prayers: prayersActions,
  comments: commentsActions,
};

export const rootSelectors = {
  auth: authSelector,
  desks: desksSelector,
  columns: columnsSelector,
  prayers: prayersSelector,
  comments: commentsSelector,
};

export const rootRoutines = {
  auth: authRoutines,
  desks: desksRoutines,
  columns: columnsRoutines,
  prayers: prayersRoutines,
  comments: commentsRoutines,
};
