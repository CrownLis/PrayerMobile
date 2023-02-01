import React, { useEffect, useRef } from 'react';
import { ScrollView, ImageBackground, SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './Columns.module.scss';
import { AuthRoutes } from '@/navigation/routes';

type ColumnsScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Columns>;

const Columns = () => {
  const dispatch = useAppDispatch();

  const scrollViewRef = useRef(null);

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
      <ScrollView ref={scrollViewRef} nestedScrollEnabled>
        {showColumns && (
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
                  >
                    {item.title}
                  </DeskCard>
                );
              })}
            </View>
          </ImageBackground>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Columns;
