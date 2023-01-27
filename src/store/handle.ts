import { UnifiedRoutine } from 'redux-saga-routines';
import { Action } from 'redux';

type RoutineType = UnifiedRoutine<(payload?: any) => Action<any>>;
type StateType = Record<string, any>;

export const handleTrigger = (routine: RoutineType) => {
  return {
    [routine.TRIGGER]: (state: StateType) => ({
      ...state,
      error: null,
    }),
  };
};

export const handleRequest = (routine: RoutineType) => {
  return {
    [routine.REQUEST]: (state: StateType) => ({
      ...state,
      loading: true,
    }),
  };
};

export const handleSuccess = (routine: RoutineType) => {
  return {
    [routine.SUCCESS]: (state: StateType, { payload }) => ({
      ...state,
      data: payload,
      error: null,
    }),
  };
};

export const handleFailure = (routine: RoutineType) => {
  return {
    [routine.FAILURE]: (state: StateType, { payload }) => ({
      ...state,
      error: payload,
    }),
  };
};

export const handleFulfill = (routine: RoutineType) => {
  return {
    [routine.FULFILL]: (state: StateType) => ({
      ...state,
      loading: false,
    }),
  };
};
