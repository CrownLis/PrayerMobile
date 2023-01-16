import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import HomePage from '../../screens/home';
import SecondPage from '../../screens/second';

const TabNavigator: FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel() {
          return false;
        },
        tabBarStyle: {},
      })}>
      <Tab.Screen name="My desk" component={HomePage} />
      <Tab.Screen name="Users desks" component={SecondPage} />
      <Tab.Screen name="Followed" component={HomePage} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
