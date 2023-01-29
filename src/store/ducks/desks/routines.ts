import { UserType } from '@/types/data';
import { SignInPayload, SignUpPayload } from '@/types/payload';
import { createRoutine } from 'redux-saga-routines';
import * as authActions from './actions';

export const getDesks = createRoutine(authActions.GET_DESKS, {
  trigger: (payload: SignInPayload) => payload,
  success: (payload: UserType) => payload,
  failure: (payload: string) => console.log(payload),
});
export const getOwnDesk = createRoutine(authActions.GET_OWN_DESK, {
  trigger: (payload: SignUpPayload) => payload,
  success: (payload: UserType) => payload,
  failure: (payload: string) => payload,
});
