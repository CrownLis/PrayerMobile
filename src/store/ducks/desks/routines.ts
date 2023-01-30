import { createRoutine } from 'redux-saga-routines';

import { GetDesksPayload } from '@/types/payload';
import * as desksActions from './actions';
import { DeskType } from '@/types/data';

export const getDesks = createRoutine(desksActions.GET_DESKS, {
  trigger: (payload: GetDesksPayload) => payload,
  success: (payload: DeskType[]) => payload,
  failure: (payload: string) => payload,
});
