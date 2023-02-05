import { createRoutine } from 'redux-saga-routines';

import { CreateCommentPayload, GetCommentsPayload } from '@/types/payload';
import { createCommentResponse, GetCommentsResponse } from '@/types/response';

import * as commentsActions from './actions';

export const getComments = createRoutine(commentsActions.GET_COMMENTS, {
  trigger: (payload: GetCommentsPayload) => payload,
  success: (payload: GetCommentsResponse) => payload,
  failure: (payload: string) => payload,
});

export const createComment = createRoutine(commentsActions.CREATE_COMMENT, {
  trigger: (payload: CreateCommentPayload) => payload,
  success: (payload: createCommentResponse) => payload,
  failure: (payload: string) => payload,
});
