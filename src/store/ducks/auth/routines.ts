import { createRoutine } from 'redux-saga-routines';

import { UserType } from '@/types/data';
import { SignInPayload, SignUpPayload } from '@/types/payload';
import * as authActions from './actions';

export const signIn = createRoutine(authActions.SIGN_IN, {
  trigger: (payload: SignInPayload) => payload,
  success: (payload: UserType) => payload,
  failure: (payload: string) => payload,
});

export const signUp = createRoutine(authActions.SIGN_UP, {
  trigger: (payload: SignUpPayload) => payload,
  success: (payload: UserType) => payload,
  failure: (payload: string) => payload,
});

export const logOut = createRoutine(authActions.LOG_OUT);
