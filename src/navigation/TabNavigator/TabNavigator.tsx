import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { colors } from '@assets/styles/color';
import HomePage from '../../screens/home';

import styles from './TabNavigator.module.scss';
const TabNavigator: FC = () => {
  const Tab = createBottomTabNavigator();

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
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <Svg width={24} height={24}>
                <Path
                  fill={focused ? colors.$color800 : colors.$color600}
                  d="M14.625 2a3 3 0 0 1 3 3v13.5a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6z"
                />
              </Svg>
              <Text>My Desk</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Users desks"
        component={SecondPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <Svg width={24} height={24}>
                <Path
                  d="M19.343 5.566c.102.378.157.774.157 1.184v10.5c0 .41-.055.806-.157 1.183A3 3 0 0 0 21 15.75v-7.5a3 3 0 0 0-1.657-2.684zM12 2.25a3 3 0 0 1 3 3v13.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6zm4.5 3c0-.41-.055-.806-.157-1.184A3 3 0 0 1 18 6.75v10.5a3 3 0 0 1-1.657 2.683c.102-.377.157-.774.157-1.183V5.25z"
                  fill={focused ? colors.$color800 : colors.$color600}
                />
              </Svg>
              <Text>Users Desk</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Followed"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navigation}>
              <Svg width={24} height={24}>
                <G fill={focused ? colors.$color800 : colors.$color600}>
                  <Path d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0zm7.5 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-13.5 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm4.06 5.367A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75a12.69 12.69 0 0 1-6.337-1.684.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38zM5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047zm15.144 5.135a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </G>
              </Svg>
              <Text>Followed</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
