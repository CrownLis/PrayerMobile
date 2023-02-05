import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { BaseState, createReducer } from '@/store/createReducer';

import { UserType } from '@/types/data';

import { logOut, setGreeting, signIn, signUp } from './routines';

type AuthStateType = BaseState<UserType>;

const initialState: AuthStateType = {
  data: null,
  loading: false,
  error: null,
};

const handleSignIn = {
  ...handleTrigger<AuthStateType>(signIn),
  ...handleRequest<AuthStateType>(signIn),
  ...handleSuccess<AuthStateType, { payload: UserType }>(signIn),
  ...handleFailure<AuthStateType, { payload: string }>(signIn),
  ...handleFulfill<AuthStateType>(signIn),
};

const handleSignUp = {
  ...handleTrigger<AuthStateType>(signUp),
  ...handleRequest<AuthStateType>(signUp),
  ...handleSuccess<AuthStateType, { payload: UserType }>(signUp),
  ...handleFailure<AuthStateType, { payload: string }>(signUp),
  ...handleFulfill<AuthStateType>(signUp),
};

const handleLogOut = {
  [logOut.SUCCESS]: (state: AuthStateType) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

const handleSetGreeting = {
  [setGreeting.SUCCESS]: (state: AuthStateType) => ({
    ...state,
    data: { ...state.data, isGreetings: true },
  }),
};

const authReducer = createReducer(initialState)({
  ...handleSignIn,
  ...handleSignUp,
  ...handleLogOut,
  ...handleSetGreeting,
});

export default authReducer;
