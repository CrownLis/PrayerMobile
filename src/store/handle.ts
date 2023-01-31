import { UnifiedRoutine } from 'redux-saga-routines';
import { Action } from 'redux';

import { BaseState } from './createReducer';

type RoutineType = UnifiedRoutine<(payload?: any) => Action<any>>;

export const handleTrigger = <State extends BaseState>(routine: RoutineType) => {
  return {
    [routine.TRIGGER]: (state: State) => ({
      ...state,
      error: null,
    }),
  };
};

export const handleRequest = <State extends BaseState>(routine: RoutineType) => {
  return {
    [routine.REQUEST]: (state: State) => ({
      ...state,
      loading: true,
    }),
  };
};

export const handleSuccess = <State extends BaseState, Payload extends { payload: any }>(routine: RoutineType) => {
  return {
    [routine.SUCCESS]: (state: State, { payload }: Payload) => ({
      ...state,
      data: payload,
      error: null,
    }),
  };
};

export const handleFailure = <State extends BaseState, Payload extends { payload: any }>(routine: RoutineType) => {
  return {
    [routine.FAILURE]: (state: State, { payload }: Payload) => ({
      ...state,
      error: payload,
    }),
  };
};

export const handleFulfill = <State extends BaseState>(routine: RoutineType) => {
  return {
    [routine.FULFILL]: (state: State) => ({
      ...state,
      loading: false,
    }),
  };
};
