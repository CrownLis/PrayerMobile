import axios from 'axios';

import {
  CreateColumnPayload,
  CreatePrayerPayload,
  DeleteColumnPayload,
  GetColumnsPayload,
  GetDesksPayload,
  GetPrayersPayload,
  SignInPayload,
  SignUpPayload,
} from '@/types/payload';
import {
  CreateColumnResponse,
  CreatePrayerResponse,
  GetColumnsResponse,
  GetDesksResponse,
  GetOwnDeskResponse,
  GetPrayersResponse,
  RemoveColumnResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/response';
import Storage from '@/utils/Storage';

const prayerApi = axios.create({
  baseURL: 'https://ae3c-217-25-217-148.eu.ngrok.io/',
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

export const createPrayerRequest = async (values: CreatePrayerPayload) => {
  const { data } = await prayerApi.post<CreatePrayerResponse>(`/columns/${values.columnId}/prayers`, {
    title: values.title,
    description: values.description,
  });
  console.log(data);
  return data;
};
