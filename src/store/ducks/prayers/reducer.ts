import { BaseState, createReducer } from '@/store/createReducer';
import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { PrayerType } from '@/types/data';

import {
  cleanPrayers,
  createPrayer,
  deletePrayer,
  doPray,
  doSubscribe,
  doUnsubscribe,
  getPrayer,
  getPrayers,
  getSubscribedPrayers,
} from './routines';

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

const handleGetPrayer = {
  ...handleTrigger<PrayersStateType>(getPrayer),
  ...handleRequest<PrayersStateType>(getPrayer),
  ...handleSuccess<PrayersStateType, { payload: PrayerType[] }>(getPrayer),
  ...handleFailure<PrayersStateType, { payload: string }>(getPrayer),
  ...handleFulfill<PrayersStateType>(getPrayer),
};

const handleGetSubscribedPrayers = {
  ...handleTrigger<PrayersStateType>(getSubscribedPrayers),
  ...handleRequest<PrayersStateType>(getSubscribedPrayers),
  ...handleSuccess<PrayersStateType, { payload: PrayerType[] }>(getSubscribedPrayers),
  ...handleFailure<PrayersStateType, { payload: string }>(getSubscribedPrayers),
  ...handleFulfill<PrayersStateType>(getSubscribedPrayers),
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

const handleDeletePrayer = {
  ...handleTrigger<PrayersStateType>(deletePrayer),
  ...handleRequest<PrayersStateType>(deletePrayer),
  [deletePrayer.SUCCESS]: (state: PrayersStateType, action: ReturnType<typeof deletePrayer.success>) => {
    if (!state.data) {
      return state;
    }
    return {
      ...state,
      data: state.data.filter((prayer) => prayer.id !== action.payload),
    };
  },
  ...handleFailure<PrayersStateType, { payload: string }>(deletePrayer),
  ...handleFulfill<PrayersStateType>(deletePrayer),
};

const handleDoSubscribe = {
  ...handleTrigger<PrayersStateType>(doSubscribe),
  ...handleRequest<PrayersStateType>(doSubscribe),
  [doSubscribe.SUCCESS]: (state: PrayersStateType, action: ReturnType<typeof doSubscribe.success>) => {
    if (!state.data) {
      return state;
    }
    return {
      ...state,
      data: state.data.map((prayer) => {
        if (prayer.id === action.payload.id) {
          return {
            ...prayer,
            ...action.payload,
          };
        } else {
          return prayer;
        }
      }),
    };
  },
  ...handleFailure<PrayersStateType, { payload: string }>(doSubscribe),
  ...handleFulfill<PrayersStateType>(doSubscribe),
};

const handleDoUnsubscribe = {
  ...handleTrigger<PrayersStateType>(doUnsubscribe),
  ...handleRequest<PrayersStateType>(doUnsubscribe),
  [doUnsubscribe.SUCCESS]: (state: PrayersStateType, action: ReturnType<typeof doUnsubscribe.success>) => {
    if (!state.data) {
      return state;
    }
    return {
      ...state,
      data: state.data.map((prayer) => {
        if (prayer.id === action.payload.id) {
          return {
            ...prayer,
            ...action.payload,
          };
        } else {
          return prayer;
        }
      }),
    };
  },
  ...handleFailure<PrayersStateType, { payload: string }>(doUnsubscribe),
  ...handleFulfill<PrayersStateType>(doUnsubscribe),
};

const handleCleanPrayers = {
  [cleanPrayers.SUCCESS]: (state: PrayersStateType) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

const handleDoPray = {
  ...handleTrigger<PrayersStateType>(doPray),
  ...handleRequest<PrayersStateType>(doPray),
  [doPray.SUCCESS]: (state: PrayersStateType, action: ReturnType<typeof doPray.success>) => {
    if (!state.data) {
      return state;
    }
    return {
      ...state,
      data: state.data.map((prayer) => {
        if (prayer.id === action.payload.id) {
          return action.payload;
        } else {
          return prayer;
        }
      }),
    };
  },
  ...handleFailure<PrayersStateType, { payload: string }>(doPray),
  ...handleFulfill<PrayersStateType>(doPray),
};

const prayersReducer = createReducer(initialState)({
  ...handleGetPrayers,
  ...handleGetPrayer,
  ...handleGetSubscribedPrayers,
  ...handleCreatePrayer,
  ...handleCleanPrayers,
  ...handleDeletePrayer,
  ...handleDoPray,
  ...handleDoSubscribe,
  ...handleDoUnsubscribe,
});

export default prayersReducer;
