import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DeskCard from '@/components/DeskCard';
import EmptyList from '@/components/EmptyList';
import ListWrapper from '@/components/ListWrapper';
import { AuthRoutes } from '@/navigation/routes';
import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Loader from '@/UI/Loader';

import styles from './UsersDesk.module.scss';

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
      {showDesks ? (
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
      ) : (
        <EmptyList text="No one`s created a desk yet :(" />
      )}
    </SafeAreaView>
  );
};

export default UsersDesk;
