import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '@/navigation/GuestStack/SignUp';
import SignIn from '@/navigation/GuestStack/SignIn';
import Greetings from '../GuestStack/Greetings/Greetings';
import { SignUpPayload } from '@/types/payload';

export type GuestStackParamList = {
  'Sign In': undefined;
  'Sign Up': undefined;
  Greetings: SignUpPayload;
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
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Greetings" component={Greetings} />
    </Stack.Navigator>
  );
};

export default GuestNav;
