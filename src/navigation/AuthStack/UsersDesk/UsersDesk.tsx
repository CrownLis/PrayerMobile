import React, { useEffect, useRef } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNav/UserNav';
import Loader from '@/UI/Loader';
import DeskCard from '@/components/DeskCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './UsersDesk.module.scss';
import { AuthRoutes } from '@/navigation/routes';

type UsersDeskScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Root>;

const UsersDesk = () => {
  const dispatch = useAppDispatch();

  const scrollViewRef = useRef(null);

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
      <ScrollView ref={scrollViewRef} nestedScrollEnabled>
        {showDesks && (
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.background}
            imageStyle={styles.image}
          >
            <View style={styles.list}>
              {desks.map((item) => {
                const title = `${item.name}’s desk`;
                return (
                  <DeskCard
                    key={item.id}
                    simultaneousHandlers={scrollViewRef}
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
            </View>
          </ImageBackground>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersDesk;
