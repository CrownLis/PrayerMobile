import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '@/screens/SignIn';
import SignUp from '@/screens/SignUp';
import Followed from '@/screens/Followed';

import { colors } from '@/assets/styles/color';
import { UsersDesks, Subscribers, MyDesk } from '@/assets/svgs';

import styles from './UserNav.module.scss';

const Tab = createBottomTabNavigator();

const UserNav: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarLabel() {
          return false;
        },
        tabBarStyle: {
          display: 'flex',
          height: 105,
          paddingBottom: 36,
          paddingTop: 12,
          gap: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      })}
    >
      <Tab.Screen
        name="My desk"
        component={SignIn}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <MyDesk width={24} height={24} fill={focused ? colors.$color800 : colors.$color600} />
              <Text>My Desk</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Users desks"
        component={SignUp}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <UsersDesks fill={focused ? colors.$color800 : colors.$color600} />
              <Text>Users Desk</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Followed"
        component={Followed}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <Subscribers fill={focused ? colors.$color800 : colors.$color600} />
              <Text>Followed</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNav;
