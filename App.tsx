import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from '@/navigation/Navigator';
import { colors } from '@/assets/styles/color';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.$color100,
  },
});

export default App;
