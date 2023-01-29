import { DeskType } from '@/types/data';
import { GetDesksPayload } from '@/types/payload';
import { GetDesksResponse } from '@/types/response';
import { createRoutine } from 'redux-saga-routines';
import * as authActions from './actions';

export const getDesks = createRoutine(authActions.GET_DESKS, {
  trigger: (payload: GetDesksPayload) => payload,
  success: (payload: GetDesksResponse) => payload,
  failure: (payload: string) => payload,
});
export const getOwnDesk = createRoutine(authActions.GET_OWN_DESK, {
  trigger: (payload: void) => payload,
  success: (payload: DeskType) => payload,
  failure: (payload: string) => payload,
});
