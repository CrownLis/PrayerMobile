import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignInPayload, SignUpPayload } from '@/types/payload';

const prayerApi = axios.create({
  baseURL: 'https://localhost:3000',
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
  const response = await prayerApi.post('/auth/sign-ip', values);
  return response;
};

export const signInRequest = async (values: SignInPayload) => {
  const response = await prayerApi.post('/auth/sign-in', values);
  return response;
};
