import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './UsersDesk.module.scss';
import { AuthRoutes } from '@/navigation/routes';
import ListWrapper from '@/components/ListWrapper';

type UsersDeskScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Root>;

const UsersDesk = () => {
  const dispatch = useAppDispatch();

  const { navigate } = useNavigation<UsersDeskScreenProps['navigation']>();
  const isFocused = useIsFocused();

  const desks = useAppSelector(rootSelectors.desks.getDesksData);
  const isLoading = useAppSelector(rootSelectors.desks.getDesksLoading);

  const isFetching = isLoading && !desks;

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.desks.getDesks({ limit: 100 }));
      return () => {
        dispatch(rootRoutines.desks.cleanDesks());
      };
    }
  }, [isFocused]);

  const showDesks = !!desks && !!desks.length;

  if (isFetching) {
    return <Loader size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showDesks && (
        <ListWrapper>
          {desks.map((item) => {
            const title = `${item.name}’s desk`;
            return (
              <DeskCard
                key={item.id}
                onPress={() =>
                  navigate(AuthRoutes.Columns, {
                    deskId: item.id,
                    title,
                  })
                }
              >
                {title}
              </DeskCard>
            );
          })}
        </ListWrapper>
      )}
    </SafeAreaView>
  );
};

export default UsersDesk;
