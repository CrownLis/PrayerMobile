import { createRoutine } from 'redux-saga-routines';

import { PrayerType } from '@/types/data';
import { CreatePrayerPayload, DeletePrayerPayload, DoPrayPayload, GetPrayersPayload } from '@/types/payload';

import * as prayersActions from './actions';

export const getPrayers = createRoutine(prayersActions.GET_PRAYERS, {
  trigger: (payload: GetPrayersPayload['columnId']) => payload,
  success: (payload: PrayerType[]) => payload,
  failure: (payload: string) => payload,
});

export const getSubscribedPrayers = createRoutine(prayersActions.GET_SUBSCRIBED_PRAYERS, {
  success: (payload: PrayerType[]) => payload,
  failure: (payload: string) => payload,
});

export const createPrayer = createRoutine(prayersActions.CREATE_PRAYER, {
  trigger: (payload: CreatePrayerPayload) => payload,
  success: (payload: PrayerType) => payload,
  failure: (payload: string) => console.log(payload),
});

export const deletePrayer = createRoutine(prayersActions.DELETE_PRAYER, {
  trigger: (payload: DeletePrayerPayload) => payload,
  success: (payload: PrayerType['id']) => payload,
  failure: (payload: string) => payload,
});

export const doPray = createRoutine(prayersActions.DO_PRAY, {
  trigger: (payload: DoPrayPayload) => payload,
  success: (payload: PrayerType) => payload,
  failure: (payload: string) => console.log(payload),
});

export const cleanPrayers = createRoutine(prayersActions.CLEAN_PRAYERS);
