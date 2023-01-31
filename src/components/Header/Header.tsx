import React, { FC } from 'react';
import { Text, SafeAreaView, View } from 'react-native';

import IconButton from '@/UI/IconButton';
import { Exit as ExitIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';
import { useAppDispatch } from '@/store/hooks';
import { rootRoutines } from '@/store/ducks';

import styles from './Header.module.scss';

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(rootRoutines.auth.logOut());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <IconButton size="middle" variant="lightest" onPress={handleLogOut}>
          <ExitIcon width={18} height={18} fill={colors.$color800} />
        </IconButton>
      </View>
    </SafeAreaView>
  );
};

export default Header;
