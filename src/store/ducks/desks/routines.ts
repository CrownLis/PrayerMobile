import { createRoutine } from 'redux-saga-routines';

import { GetDesksPayload } from '@/types/payload';
import { DeskType } from '@/types/data';
import * as desksActions from './actions';

export const getDesks = createRoutine(desksActions.GET_DESKS, {
  trigger: (payload: GetDesksPayload) => payload,
  success: (payload: DeskType[]) => payload,
  failure: (payload: string) => payload,
});

export const cleanDesks = createRoutine(desksActions.CLEAN_DESKS);
