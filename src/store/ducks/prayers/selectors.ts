import type { AppState } from '@/store/configureStore';

export const getPrayersState = (state: AppState) => state.prayers.data;

export const getPrayersLoading = (state: AppState) => state.prayers.loading;
