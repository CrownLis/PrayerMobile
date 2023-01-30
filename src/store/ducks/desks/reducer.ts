import { handleFailure, handleFulfill, handleRequest, handleSuccess, handleTrigger } from '@/store/handle';
import { BaseState, createReducer } from '@/store/createReducer';

import { DeskType } from '@/types/data';

import { getDesks } from './routines';

type DesksStateType = BaseState<DeskType[]>;

const initialState: DesksStateType = {
  data: null,
  loading: false,
  error: null,
};

const handleGetDesks = {
  ...handleTrigger<DesksStateType>(getDesks),
  ...handleRequest<DesksStateType>(getDesks),
  ...handleSuccess<DesksStateType, { payload: DeskType[] }>(getDesks),
  ...handleFailure<DesksStateType, { payload: string }>(getDesks),
  ...handleFulfill<DesksStateType>(getDesks),
};

const desksReducer = createReducer(initialState)({
  ...handleGetDesks,
});

export default desksReducer;
