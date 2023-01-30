import React, { useEffect } from 'react';
import { FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './UsersDesk.module.scss';

type UsersDeskProps = NativeStackScreenProps<UserStackParamList, 'Root'>;

const UsersDesk = ({ navigation }: UsersDeskProps) => {
  const dispatch = useAppDispatch();

  const desks = useAppSelector(rootSelectors.desks.getDesksData);

  useEffect(() => {
    dispatch(rootRoutines.desks.getDesks({ limit: 100 }));
  }, [dispatch]);

  const showDesks = !!desks && !!desks.length;

  return (
    <SafeAreaView style={styles.container}>
      {showDesks && (
        <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background} imageStyle={styles.image}>
          <FlatList
            data={desks}
            style={styles.list}
            renderItem={({ item }) => {
              return (
                <DeskCard
                  columnId={item.id}
                  key={item.id}
                  style={styles.item}
                  onPress={() =>
                    navigation.push('Columns', {
                      deskId: item.id,
                    })
                  }
                >
                  {item.name}
                </DeskCard>
              );
            }}
          />
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default UsersDesk;
