import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { colors } from '@assets/styles/color';

import withAuthNavigation from '@hoc/withAuthNavigation';

type Props = PropsWithChildren<void>;

const App = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>{children}</NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.$color100,
  },
});

export default withAuthNavigation(App);
