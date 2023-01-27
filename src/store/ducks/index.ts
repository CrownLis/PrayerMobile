import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { all } from 'redux-saga/effects';
import { persistReducer } from 'redux-persist';
import * as authSaga from './auth/saga';

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
  yield all([authSaga]);
}
