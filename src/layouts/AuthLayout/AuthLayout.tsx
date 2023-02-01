import React, { FC, PropsWithChildren } from 'react';
import { SafeAreaView, ImageBackground, View, ScrollView } from 'react-native';

import styles from './AuthLayout.module.scss';
import backgroundImg from '@/assets/images/background-1.png';

type LayoutProps = PropsWithChildren;

const AuthLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
        <View style={styles.formContainer}>
          <ScrollView>{children}</ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AuthLayout;
