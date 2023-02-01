import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '@/navigation/GuestStack/SignUp';
import SignIn from '@/navigation/GuestStack/SignIn';
import Greetings from '../GuestStack/Greetings/Greetings';
import { SignUpPayload } from '@/types/payload';
import { UnAuthRoutes } from '../routes';

export type GuestStackParamList = {
  [UnAuthRoutes.SignIn]: undefined;
  [UnAuthRoutes.SignUp]: undefined;
  [UnAuthRoutes.Greetings]: SignUpPayload;
};

const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestNav = () => {
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
      <Stack.Screen name={UnAuthRoutes.Greetings} component={Greetings} />
    </Stack.Navigator>
  );
};

export default GuestNav;
