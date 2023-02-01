import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import IconButton from '@/UI/IconButton';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import ColumnOverlay from '@/components/ColumnOverlay';
import { ColumnType } from '@/types/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { Arrow, EmptyColumn, Plus as PlusIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './MyDesk.module.scss';
import { AuthRoutes } from '@/navigation/routes';

type MyDeskScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Root>;

const MyDesk = () => {
  const { navigate } = useNavigation<MyDeskScreenProps['navigation']>();
  const isFocused = useIsFocused();

  const scrollViewRef = useRef(null);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const dispatch = useAppDispatch();

  const columns = useAppSelector(rootSelectors.columns.getColumnsData);
  const isLoading = useAppSelector(rootSelectors.columns.getColumnsLoading);

  const isFetching = isLoading && !columns;

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.columns.getOwnColumns({ limit: 100 }));
      return () => {
        dispatch(rootRoutines.columns.cleanColumns());
      };
    }
  }, [isFocused]);

  const handleDelete = (columnId: ColumnType['id']) => {
    dispatch(rootRoutines.columns.deleteColumn(columnId));
  };

  const showColumns = !!columns && !!columns.length;

  if (isFetching) {
    return <Loader size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showColumns ? (
        <ScrollView ref={scrollViewRef} nestedScrollEnabled>
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.background}
            imageStyle={styles.image}
          >
            <View style={styles.list}>
              {columns.map((item) => {
                return (
                  <DeskCard
                    key={item.id}
                    simultaneousHandlers={scrollViewRef}
                    onPress={() =>
                      navigate(AuthRoutes.Column, {
                        id: item.id,
                        title: item.title,
                      })
                    }
                    onDismiss={() => handleDelete(item.id)}
                  >
                    {item.title}
                  </DeskCard>
                );
              })}
            </View>
          </ImageBackground>
        </ScrollView>
      ) : (
        <View style={styles.emptyColumn}>
          <EmptyColumn />
          <Text>You haven't created any column.</Text>
          <Arrow fill={colors.color800} style={styles.arrow} />
        </View>
      )}
      <ColumnOverlay isVisible={overlayVisible} onClose={() => setOverlayVisible(false)} />
      <IconButton size="big" variant="dark" style={styles.floatButton} onPress={() => setOverlayVisible(true)}>
        <PlusIcon fill={colors.color100} />
      </IconButton>
    </SafeAreaView>
  );
};

export default MyDesk;
