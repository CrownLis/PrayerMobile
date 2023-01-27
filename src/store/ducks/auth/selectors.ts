import type { AppState } from '@/store/configureStore';

export const getAuthState = (state: AppState) => state.auth;

export const getIsAuth = (state: AppState) => Boolean(state.auth.data);
