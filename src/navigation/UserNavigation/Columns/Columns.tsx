import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DeskCard from '@/components/DeskCard';
import EmptyList from '@/components/EmptyList';
import ListWrapper from '@/components/ListWrapper';
import { AuthRoutes } from '@/navigation/routes';
import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Loader from '@/UI/Loader';

import styles from './Columns.module.scss';

type ColumnsScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Columns>;

const Columns = () => {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const { params } = useRoute<ColumnsScreenProps['route']>();
  const { navigate } = useNavigation<ColumnsScreenProps['navigation']>();

  const columns = useAppSelector(rootSelectors.columns.getColumnsData);
  const isLoading = useAppSelector(rootSelectors.columns.getColumnsLoading);

  const isFetching = isLoading && !columns;

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.columns.getColumns({ limit: 100, deskId: params.deskId }));
      return () => {
        dispatch(rootRoutines.columns.cleanColumns());
      };
    }
  }, [params.deskId, isFocused]);

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
                    userId: item.userId,
                  })
                }
              >
                {item.title}
              </DeskCard>
            );
          })}
        </ListWrapper>
      ) : (
        <EmptyList text="User has not created columns yet" />
      )}
    </SafeAreaView>
  );
};

export default Columns;
