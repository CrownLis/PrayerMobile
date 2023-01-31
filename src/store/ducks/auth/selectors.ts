import type { AppState } from '@/store/configureStore';

export const getAuthState = (state: AppState) => state.auth;

export const getAuthData = (state: AppState) => state.auth.data;

export const getIsAuth = (state: AppState) => Boolean(state.auth.data);

export const getAuthLoading = (state: AppState) => state.auth.loading;
