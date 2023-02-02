import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { BaseState, createReducer } from '@/store/createReducer';

import { PrayerType } from '@/types/data';
import { cleanPrayers, createPrayer, getPrayers } from './routines';

type PrayersStateType = BaseState<PrayerType[]>;

const initialState: PrayersStateType = {
  data: null,
  loading: false,
  error: null,
};

const handleGetPrayers = {
  ...handleTrigger<PrayersStateType>(getPrayers),
  ...handleRequest<PrayersStateType>(getPrayers),
  ...handleSuccess<PrayersStateType, { payload: PrayerType[] }>(getPrayers),
  ...handleFailure<PrayersStateType, { payload: string }>(getPrayers),
  ...handleFulfill<PrayersStateType>(getPrayers),
};

const handleCreatePrayer = {
  ...handleTrigger<PrayersStateType>(createPrayer),
  ...handleRequest<PrayersStateType>(createPrayer),
  [createPrayer.SUCCESS]: (state: PrayersStateType, action: ReturnType<typeof createPrayer.success>) => ({
    ...state,
    data: [action.payload, ...(state.data || [])],
  }),
  ...handleFailure<PrayersStateType, { payload: string }>(createPrayer),
  ...handleFulfill<PrayersStateType>(createPrayer),
};

const handleCleanPrayers = {
  [cleanPrayers.SUCCESS]: (state: PrayersStateType) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

const prayersReducer = createReducer(initialState)({
  ...handleGetPrayers,
  ...handleCreatePrayer,
  ...handleCleanPrayers,
});

export default prayersReducer;
