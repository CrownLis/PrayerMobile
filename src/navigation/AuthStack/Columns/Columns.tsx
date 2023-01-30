import React, { useEffect } from 'react';
import { FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './Columns.module.scss';

type ColumnsProps = NativeStackScreenProps<UserStackParamList, 'Columns'>;

const Columns = ({ navigation, route }: ColumnsProps) => {
  const dispatch = useAppDispatch();

  const columns = useAppSelector(rootSelectors.columns.getColumnsData);

  useEffect(() => {
    dispatch(rootRoutines.columns.getColumns({ limit: 100, deskId: route.params.deskId }));
  }, [dispatch, route.params.deskId]);

  const showColumns = !!columns && !!columns.length;

  return (
    <SafeAreaView style={styles.container}>
      {showColumns && (
        <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background} imageStyle={styles.image}>
          <FlatList
            data={columns}
            style={styles.list}
            renderItem={({ item }) => {
              return (
                <DeskCard
                  key={item.id}
                  style={styles.item}
                  onPress={() =>
                    navigation.push('Column', {
                      id: item.id,
                    })
                  }
                >
                  {item.title}
                </DeskCard>
              );
            }}
          />
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default Columns;
