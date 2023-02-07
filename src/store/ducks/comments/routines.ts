import { createRoutine } from 'redux-saga-routines';

import { CommentType } from '@/types/data';
import { CreateCommentPayload, GetCommentsPayload } from '@/types/payload';
import { createCommentResponse } from '@/types/response';

import * as commentsActions from './actions';

export const getComments = createRoutine(commentsActions.GET_COMMENTS, {
  trigger: (payload: GetCommentsPayload) => payload,
  success: (payload: CommentType[]) => payload,
  failure: (payload: string) => payload,
});

export const createComment = createRoutine(commentsActions.CREATE_COMMENT, {
  trigger: (payload: CreateCommentPayload) => payload,
  success: (payload: createCommentResponse) => payload,
  failure: (payload: string) => payload,
});

export const cleanComments = createRoutine(commentsActions.CLEAN_COMMENTS);
