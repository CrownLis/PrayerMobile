import { NavigationContainer } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';

import withAuthNavigation from '~hoc/withAuthNavigation';

type Props = PropsWithChildren<void>;

const App = ({ children }: Props) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default withAuthNavigation(App);
