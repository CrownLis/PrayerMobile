import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { BaseState, createReducer } from '@/store/createReducer';

import { CommentType } from '@/types/data';
import { getComments } from './routines';

type CommentsStateType = BaseState<CommentType[]>;

const initialState: CommentsStateType = {
  data: null,
  loading: false,
  error: null,
};

const handleGetComments = {
  ...handleTrigger<CommentsStateType>(getComments),
  ...handleRequest<CommentsStateType>(getComments),
  ...handleSuccess<CommentsStateType, { payload: CommentType[] }>(getComments),
  ...handleFailure<CommentsStateType, { payload: string }>(getComments),
  ...handleFulfill<CommentsStateType>(getComments),
};

const commentsReducer = createReducer(initialState)({
  ...handleGetComments,
});

export default commentsReducer;
