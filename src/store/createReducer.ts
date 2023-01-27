import { Action } from 'redux';

export type BaseState<Data = any> = {
  data: Data | null;
  loading: boolean;
  error: string | null;
};

export const createReducer =
  <State extends BaseState>(initialState: State) =>
  (reducerMap: Record<string, any>) =>
  (state = initialState, action: Action) => {
    const reducer = reducerMap[action.type];
    return (reducer ? reducer(state, action) : state) as State;
  };
