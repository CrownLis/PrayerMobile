import { createRoutine } from 'redux-saga-routines';

import { DeskType } from '@/types/data';
import { GetDesksPayload } from '@/types/payload';

import * as desksActions from './actions';

export const getDesks = createRoutine(desksActions.GET_DESKS, {
  trigger: (payload: GetDesksPayload) => payload,
  success: (payload: DeskType[]) => payload,
  failure: (payload: string) => payload,
});

export const cleanDesks = createRoutine(desksActions.CLEAN_DESKS);
