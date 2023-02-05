import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';

import Storage from '@/utils/Storage';

import {
  actions as authActions,
  reducer as authReducer,
  routines as authRoutines,
  saga as authSaga,
  selectors as authSelector,
} from './auth';
import {
  actions as columnsActions,
  reducer as columnsReducer,
  routines as columnsRoutines,
  saga as columnsSaga,
  selectors as columnsSelector,
} from './columns';
import {
  actions as commentsActions,
  reducer as commentsReducer,
  routines as commentsRoutines,
  saga as commentsSaga,
  selectors as commentsSelector,
} from './comments';
import {
  actions as desksActions,
  reducer as desksReducer,
  routines as desksRoutines,
  saga as desksSaga,
  selectors as desksSelector,
} from './desks';
import {
  actions as prayersActions,
  reducer as prayersReducer,
  routines as prayersRoutines,
  saga as prayersSaga,
  selectors as prayersSelector,
} from './prayers';

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
