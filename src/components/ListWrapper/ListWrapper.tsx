import React, { FC, PropsWithChildren } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import backgroundImg from '@/assets/images/background-1.png';

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
