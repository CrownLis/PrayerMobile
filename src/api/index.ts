import axios from 'axios';

import {
  CreateColumnPayload,
  CreateCommentPayload,
  CreatePrayerPayload,
  DeleteColumnPayload,
  DeletePrayerPayload,
  DoPrayPayload,
  DoSubscribePayload,
  GetColumnsPayload,
  GetCommentsPayload,
  GetDesksPayload,
  GetPrayerPayload,
  GetPrayersPayload,
  SignInPayload,
  SignUpPayload,
} from '@/types/payload';
import {
  CreateColumnResponse,
  createCommentResponse,
  CreatePrayerResponse,
  DoPrayResponse,
  DoSubscribeResponse,
  GetColumnsResponse,
  GetCommentsResponse,
  GetDesksResponse,
  GetOwnDeskResponse,
  GetPrayersResponse,
  GetSubscribedPrayersResponse,
  RemoveColumnResponse,
  RemovePrayerResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/response';
import Storage from '@/utils/Storage';

const prayerApi = axios.create({
  baseURL: 'https://13ef-217-25-222-25.eu.ngrok.io/',
  headers: {
    'Content-Type': 'application/json',
  },
});

prayerApi.interceptors.request.use(
  async (config) => {
    const token = await Storage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const signUpRequest = async (values: SignUpPayload) => {
  const { data } = await prayerApi.post<SignUpResponse>('/auth/sign-up', values);
  return data;
};

export const signInRequest = async (values: SignInPayload) => {
  const { data } = await prayerApi.post<SignInResponse>('/auth/sign-in', values);
  return data;
};

export const getDesksRequest = async ({ limit, afterCursor }: GetDesksPayload) => {
  const { data } = await prayerApi.get<GetDesksResponse>('/desks', {
    params: {
      limit,
      afterCursor,
    },
  });
  return data;
};

export const getOwnDeskRequest = async () => {
  const { data } = await prayerApi.get<GetOwnDeskResponse>('/desks/my');
  return data;
};

export const getColumnsRequest = async ({ deskId, limit, afterCursor }: GetColumnsPayload) => {
  const { data } = await prayerApi.get<GetColumnsResponse>(`/desks/${deskId}/columns`, {
    params: {
      limit,
      afterCursor,
    },
  });
  return data;
};

export const createColumnRequest = async (values: CreateColumnPayload) => {
  const { data } = await prayerApi.post<CreateColumnResponse>('/columns', values);
  return data;
};

export const removeColumnRequest = async (columnId: DeleteColumnPayload) => {
  const { data } = await prayerApi.delete<RemoveColumnResponse>(`/columns/${columnId}`);
  return data;
};

export const getPrayersRequest = async (columnId: GetPrayersPayload['columnId']) => {
  const { data } = await prayerApi.get<GetPrayersResponse>(`/columns/${columnId}/prayers`);
  return data;
};

export const getPrayerRequest = async (id: GetPrayerPayload['id']) => {
  const { data } = await prayerApi.get<GetPrayersResponse>(`/prayers/${id}`);
  return data;
};

export const getSubscribedPrayersRequest = async () => {
  const { data } = await prayerApi.get<GetSubscribedPrayersResponse>('/subscribed-prayers');
  return data;
};

export const createPrayerRequest = async (values: CreatePrayerPayload) => {
  const { data } = await prayerApi.post<CreatePrayerResponse>(`/columns/${values.columnId}/prayers`, {
    title: values.title,
    description: values.description,
  });
  return data;
};

export const deletePrayerRequest = async (id: DeletePrayerPayload) => {
  const { data } = await prayerApi.delete<RemovePrayerResponse>(`/prayers/${id}`);
  return data;
};

export const doPrayRequest = async (id: DoPrayPayload) => {
  const { data } = await prayerApi.post<DoPrayResponse>(`/prayers/${id}/do`);
  return data;
};

export const getCommentsRequest = async ({ id, limit, afterCursor }: GetCommentsPayload) => {
  const { data } = await prayerApi.get<GetCommentsResponse>(`/prayers/${id}/comments`, {
    params: {
      limit,
      afterCursor,
    },
  });
  return data;
};

export const createCommentsRequest = async (values: CreateCommentPayload) => {
  const { data } = await prayerApi.post<createCommentResponse>(`/prayers/${values.prayerId}/comments`, {
    body: values.body,
  });
  return data;
};

export const doSubscribeRequest = async (id: DoSubscribePayload) => {
  const { data } = await prayerApi.post<DoSubscribeResponse>(`/prayers/${id}/subscribe`);
  return data;
};

export const doUnsubscribeRequest = async (id: DoSubscribePayload) => {
  const { data } = await prayerApi.delete<DoSubscribeResponse>(`/prayers/${id}/subscribe`);
  return data;
};
