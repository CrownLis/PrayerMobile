import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import IconButton from '@/UI/IconButton';
import DeskCard from '@/components/DeskCard';
import ColumnOverlay from '@/components/ColumnOverlay';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { Plus as PlusIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './MyDesk.module.scss';

type MyDeskProps = NativeStackScreenProps<UserStackParamList, 'Root'>;

const MyDesk = ({ navigation }: MyDeskProps) => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  const dispatch = useAppDispatch();

  const columns = useAppSelector(rootSelectors.columns.getColumnsData);

  useEffect(() => {
    dispatch(rootRoutines.columns.getOwnColumns({ limit: 100 }));
  }, [dispatch, overlayVisible]);

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
      <ColumnOverlay isVisible={overlayVisible} onClose={() => setOverlayVisible(false)} />
      <IconButton size="big" variant="dark" style={styles.floatButton} onPress={() => setOverlayVisible(true)}>
        <PlusIcon fill={colors.$color100} />
      </IconButton>
    </SafeAreaView>
  );
};

export default MyDesk;
