import { createRoutine } from 'redux-saga-routines';
import * as commentsActions from './actions';
import { CreateCommentPayload, getCommentsPayload } from '@/types/payload';
import { createCommentResponse, getCommentsResponse } from '@/types/response';

export const getComments = createRoutine(commentsActions.GET_COMMENTS, {
  trigger: (payload: getCommentsPayload) => payload,
  success: (payload: getCommentsResponse) => payload,
  failure: (payload: string) => payload,
});

export const createComment = createRoutine(commentsActions.CREATE_COMMENT, {
  trigger: (payload: CreateCommentPayload) => payload,
  success: (payload: createCommentResponse) => payload,
  failure: (payload: string) => payload,
});
