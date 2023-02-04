import { createRoutine } from 'redux-saga-routines';
import * as commentsActions from './actions';
import { getCommentsPayload } from '@/types/payload';
import { getCommentsResponse } from '@/types/response';

export const getComments = createRoutine(commentsActions.GET_COMMENTS, {
  trigger: (payload: getCommentsPayload) => payload,
  success: (payload: getCommentsResponse) => payload,
  failure: (payload: string) => payload,
});
