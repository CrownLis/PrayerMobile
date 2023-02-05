import type { AppState } from '@/store/configureStore';
import { PrayerType } from '@/types/data';

export const getPrayersState = (state: AppState) => state.prayers.data;

export const getPrayersData = (state: AppState) => state.prayers.data;

export const getPrayersLoading = (state: AppState) => state.prayers.loading;

export const getPrayerById = (state: AppState, prayerId: PrayerType['id']) =>
  state?.prayers?.data?.find((prayer) => prayer.id === prayerId);
