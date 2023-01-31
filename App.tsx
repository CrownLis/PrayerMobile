import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from '@/navigation/Navigator';
import { colors } from '@/assets/styles/color';
import configureStore from '@/store/configureStore';

const App = () => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </PersistGate>
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
