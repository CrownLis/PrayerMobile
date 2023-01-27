import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from '@/screens/SignUp';
import SignIn from '@/screens/SignIn';

export type GuestStackParamList = {
  'Sign In': undefined;
  'Sign Up': undefined;
};

const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default GuestNav;
