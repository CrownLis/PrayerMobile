import axios from 'axios';

import {
  CreateColumnPayload,
  CreatePrayerPayload,
  DeleteColumnPayload,
  DeletePrayerPayload,
  DoPrayPayload,
  GetColumnsPayload,
  GetDesksPayload,
  GetPrayersPayload,
  SignInPayload,
  SignUpPayload,
} from '@/types/payload';
import {
  CreateColumnResponse,
  CreatePrayerResponse,
  DoPrayResponse,
  GetColumnsResponse,
  GetDesksResponse,
  GetOwnDeskResponse,
  GetPrayersResponse,
  RemoveColumnResponse,
  RemovePrayerResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/response';
import Storage from '@/utils/Storage';

const prayerApi = axios.create({
  baseURL: 'https://db4b-217-25-213-26.eu.ngrok.io/',
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
