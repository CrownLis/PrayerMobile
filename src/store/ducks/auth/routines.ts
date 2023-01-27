import { createRoutine } from 'redux-saga-routines';
import * as authActions from './actions';

export const signIn = createRoutine(authActions.SIGN_IN);

export const signUp = createRoutine(authActions.SIGN_UP);

export const logOut = createRoutine(authActions.LOG_OUT);
