import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@/navigation/GuestNavigation/SignIn';
import SignUp from '@/navigation/GuestNavigation/SignUp';

import { UnAuthRoutes } from '../routes';

export type GuestStackParamList = {
  [UnAuthRoutes.SignIn]: undefined;
  [UnAuthRoutes.SignUp]: undefined;
};

const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={(options) => ({
        ...options,
        animation: 'none',
        headerShown: false,
      })}
    >
      <Stack.Screen name={UnAuthRoutes.SignIn} component={SignIn} />
      <Stack.Screen name={UnAuthRoutes.SignUp} component={SignUp} />
    </Stack.Navigator>
  );
};

export default GuestNavigation;
