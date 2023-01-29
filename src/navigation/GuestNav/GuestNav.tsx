import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '@/navigation/GuestStack/SignUp';
import SignIn from '@/navigation/GuestStack/SignIn';
import Greetings from '../GuestStack/Greetings/Greetings';
import { SignUpPayload } from '@/types/payload';

export type GuestStackParamList = {
  'Sign In': undefined;
  'Sign Up': undefined;
  Greetings: { email: SignUpPayload['email']; name: SignUpPayload['name']; password: SignUpPayload['password'] };
};

const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen
        name="Greetings"
        component={Greetings}
        initialParams={{ email: undefined, name: undefined, password: undefined }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default GuestNav;
