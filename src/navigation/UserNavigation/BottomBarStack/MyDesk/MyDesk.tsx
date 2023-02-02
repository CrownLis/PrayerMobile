import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import IconButton from '@/UI/IconButton';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import { ColumnType } from '@/types/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { Plus as PlusIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './MyDesk.module.scss';
import { AuthRoutes } from '@/navigation/routes';
import CreationModal from '@/components/CreationModal';
import EmptyList from '@/components/EmptyList';
import ListWrapper from '@/components/ListWrapper';

type FormValues = {
  title: string;
};

type MyDeskScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Root>;

const MyDesk = () => {
  const { navigate } = useNavigation<MyDeskScreenProps['navigation']>();
  const isFocused = useIsFocused();

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

  const onSubmit = (data: FormValues) => {
    dispatch(
      rootRoutines.columns.createColumn({
        ...data,
        description: 'New column',
      }),
    );
  };

  const showColumns = !!columns && !!columns.length;

  if (isFetching) {
    return <Loader size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showColumns ? (
        <ListWrapper>
          {columns.map((item) => {
            return (
              <DeskCard
                key={item.id}
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
        </ListWrapper>
      ) : (
        <EmptyList />
      )}
      <View>
        <CreationModal
          isVisible={overlayVisible}
          onClose={() => setOverlayVisible(false)}
          title={'column'}
          onSubmit={onSubmit}
        />
        <IconButton size="big" variant="dark" style={styles.floatButton} onPress={() => setOverlayVisible(true)}>
          <PlusIcon fill={colors.color100} />
        </IconButton>
      </View>
    </SafeAreaView>
  );
};

export default MyDesk;
