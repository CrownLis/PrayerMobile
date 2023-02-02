import React, { useEffect } from 'react';
import { ScrollView, ImageBackground, SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './Columns.module.scss';
import { AuthRoutes } from '@/navigation/routes';
import ListWrapper from '@/components/ListWrapper';

type ColumnsScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Columns>;

const Columns = () => {
  const dispatch = useAppDispatch();

  const { params } = useRoute<ColumnsScreenProps['route']>();
  const { navigate } = useNavigation<ColumnsScreenProps['navigation']>();
  const isFocused = useIsFocused();

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
      {showColumns && (
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
              >
                {item.title}
              </DeskCard>
            );
          })}
        </ListWrapper>
      )}
    </SafeAreaView>
  );
};

export default Columns;
