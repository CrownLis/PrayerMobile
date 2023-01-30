import axios from 'axios';

import {
  CreateColumnPayload,
  DeleteColumnPayload,
  GetColumnsPayload,
  GetDesksPayload,
  SignInPayload,
  SignUpPayload,
} from '@/types/payload';
import {
  CreateColumnResponse,
  GetColumnsResponse,
  GetDesksResponse,
  GetOwnDeskResponse,
  RemoveColumnResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/response';
import Storage from '@/utils/Storage';

const prayerApi = axios.create({
  baseURL: 'https://42d2-217-25-213-87.eu.ngrok.io',
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
