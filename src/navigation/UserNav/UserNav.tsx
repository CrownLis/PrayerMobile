import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyDesk from '@/navigation/AuthStack/MyDesk';
import UsersDesk from '@/navigation/AuthStack/UsersDesk';
import Followed from '@/navigation/AuthStack/Followed';
import Header from '@/components/Header';
import IconButton from '@/UI/IconButton';
import { mergeStyles } from '@/utils/mergeStyles';
import Columns from '../AuthStack/Columns';
import Column from '../AuthStack/Column';
import Prayer from '../AuthStack/Prayer';

import { colors } from '@/assets/styles/color';
import {
  Back as BackIcon,
  MyDesk as MyDeskIcon,
  Subscribers as SubscribersIcon,
  UsersDesks as UsersDesksIcon,
} from '@/assets/svgs';

import styles from './UserNav.module.scss';
import { AuthRoutes } from '../routes';

type ScreenWithTitle<T = unknown> = {
  title: string;
} & T;

export type UserStackParamList = {
  [AuthRoutes.Root]: undefined;
  [AuthRoutes.Columns]: ScreenWithTitle<{
    deskId: number;
  }>;
  [AuthRoutes.Column]: ScreenWithTitle<{
    id: number;
  }>;
  [AuthRoutes.Prayer]: ScreenWithTitle<{
    id: number;
  }>;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<UserStackParamList>();

const Root = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.container}
      screenOptions={(options) => ({
        ...options,
        header: (props) => <Header title={props.route.name} />,
        tabBarLabel: () => false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="My desk"
        component={MyDesk}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <MyDeskIcon width={24} height={24} fill={focused ? colors.color800 : colors.color600} />
              <Text
                style={mergeStyles(
                  {
                    style: styles.tabBarIconText,
                    active: true,
                  },
                  {
                    style: styles.tabBarIconText_active,
                    active: focused,
                  },
                )}
              >
                My Desk
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Users desks"
        component={UsersDesk}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <UsersDesksIcon width={24} height={24} fill={focused ? colors.color800 : colors.color600} />
              <Text
                style={mergeStyles(
                  {
                    style: styles.tabBarIconText,
                    active: true,
                  },
                  {
                    style: styles.tabBarIconText_active,
                    active: focused,
                  },
                )}
              >
                Users Desk
              </Text>
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
              <SubscribersIcon width={24} height={24} fill={focused ? colors.color800 : colors.color600} />
              <Text
                style={mergeStyles(
                  {
                    style: styles.tabBarIconText,
                    active: true,
                  },
                  {
                    style: styles.tabBarIconText_active,
                    active: focused,
                  },
                )}
              >
                Followed
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const UserNav: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        animation: 'none',
        contentStyle: styles.screenContent,
        header: ({ navigation, route }) => {
          const params = (route.params || {}) as ScreenWithTitle;
          const title = params.title || route.name;
          return (
            <View style={styles.header}>
              <IconButton
                size="middle"
                variant="lightest"
                onPress={() => navigation.goBack()}
                style={styles.headerBack}
              >
                <BackIcon fill={colors.color800} />
              </IconButton>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          );
        },
      })}
    >
      <Stack.Screen name={AuthRoutes.Root} component={Root} options={{ headerShown: false }} />
      <Stack.Screen name={AuthRoutes.Columns} component={Columns} />
      <Stack.Screen name={AuthRoutes.Column} component={Column} />
      <Stack.Screen name={AuthRoutes.Prayer} component={Prayer} />
    </Stack.Navigator>
  );
};

export default UserNav;
