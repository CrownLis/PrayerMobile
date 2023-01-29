import type { AppState } from '@/store/configureStore';

export const getDesksList = (state: AppState) => state.desks.data;