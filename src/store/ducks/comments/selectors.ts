import type { AppState } from '@/store/configureStore';

export const getCommentsState = (state: AppState) => state.comments.data;

export const getCommentsLoading = (state: AppState) => state.comments.loading;
