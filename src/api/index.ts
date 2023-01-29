import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetDesksPayload, SignInPayload, SignUpPayload } from '@/types/payload';
import { GetDesksResponse, SignInResponse, SignUpResponse } from '@/types/response';
import { DeskType } from '@/types/data';

const prayerApi = axios.create({
  baseURL: 'https://d299-185-13-179-156.eu.ngrok.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

prayerApi.interceptors.request.use(
  async (config) => {
    const authData = await AsyncStorage.getItem('auth');
    if (authData) {
      const data = JSON.parse(authData);
      if (data && data.token) {
        config.headers.Authorization = `Bearer ${data.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const signUpRequest = async (values: SignUpPayload) => {
  const response = await prayerApi.post<SignUpResponse>('/auth/sign-up', values);
  return response;
};

export const signInRequest = async (values: SignInPayload) => {
  const response = await prayerApi.post<SignInResponse>('/auth/sign-in', values);
  return response;
};

export const getDesksRequest = async (values: GetDesksPayload) => {
  const response = await prayerApi.get<GetDesksResponse>(
    `/desks/?limit=${values.limit}&afterCursor=${values.afterCursor}`,
  );
  return response;
};

export const getOwnDeskRequest = async () => {
  const response = await prayerApi.get<DeskType>('/desks/my');
  return response;
};
