import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { createReducer } from './../../createReducer';
import { logOut, signIn, signUp } from './routines';

type AuthReducerType = {
  data: any;
  loading: boolean;
  error: string | null;
};

const initialState: AuthReducerType = {
  data: null,
  loading: false,
  error: null,
};

const handleSignIn = {
  ...handleTrigger(signIn),
  ...handleRequest(signIn),
  ...handleSuccess(signIn),
  ...handleFailure(signIn),
  ...handleFulfill(signIn),
};

const handleSignUp = {
  ...handleTrigger(signUp),
  ...handleRequest(signUp),
  ...handleSuccess(signUp),
  ...handleFailure(signUp),
  ...handleFulfill(signUp),
};

const handleLogOut = {
  [logOut.SUCCESS]: (state: Record<string, any>) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

export const authReducer = createReducer(initialState)({
  ...handleSignIn,
  ...handleSignUp,
  ...handleLogOut,
});
