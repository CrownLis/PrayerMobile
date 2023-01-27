import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInPayload, SignUpPayload } from '@/types/payload';
import { SignInResponse, SignUpResponse } from '@/types/response';

const prayerApi = axios.create({
  baseURL: 'https://c792-217-25-222-241.eu.ngrok.io',
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
