import type { AppState } from '@/store/configureStore';

export const getColumnsState = (state: AppState) => state.columns;

export const getColumnsData = (state: AppState) => state.columns.data;

export const getColumnsLoading = (state: AppState) => state.columns.loading;
