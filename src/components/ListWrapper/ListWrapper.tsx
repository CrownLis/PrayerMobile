import React, { FC, PropsWithChildren } from 'react';

import backgroundImg from '@/assets/images/background-1.png';
import { ScrollView, ImageBackground, View } from 'react-native';

import styles from './ListWrapper.module.scss';

const ListWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background} imageStyle={styles.image}>
        <View style={styles.list}>{children}</View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ListWrapper;
