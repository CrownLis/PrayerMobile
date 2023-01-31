import type { AppState } from '@/store/configureStore';

export const getDesksState = (state: AppState) => state.desks;

export const getDesksData = (state: AppState) => state.desks.data;

export const getDesksLoading = (state: AppState) => state.desks.loading;
