import { BaseState, createReducer } from '@/store/createReducer';
import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { CommentType } from '@/types/data';

import { createComment, getComments } from './routines';

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

const handleCreateComment = {
  ...handleTrigger<CommentsStateType>(createComment),
  ...handleRequest<CommentsStateType>(createComment),
  [createComment.SUCCESS]: (state: CommentsStateType, action: ReturnType<typeof createComment.success>) => ({
    ...state,
    data: [action.payload, ...(state.data || [])],
  }),
  ...handleFailure<CommentsStateType, { payload: string }>(createComment),
  ...handleFulfill<CommentsStateType>(createComment),
};

const commentsReducer = createReducer(initialState)({
  ...handleGetComments,
  ...handleCreateComment,
});

export default commentsReducer;
