import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import Navigator from '@/navigation/Navigator';
import { colors } from '@/assets/styles/color';
import configureStore from '@/store/configureStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.$color100,
  },
});

export default App;
