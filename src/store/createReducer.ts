import { Action } from 'redux';

export const createReducer =
  (initialState: Record<string, any>) =>
  (reducerMap: Record<string, any>) =>
  (state = initialState, action: Action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
