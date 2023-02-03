import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';

import styles from './Column.module.scss';
import { AuthRoutes } from '@/navigation/routes';
import PrayerCard from '@/components/PrayerCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Loader from '@/UI/Loader';

import { Plus as PlusIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';
import IconButton from '@/UI/IconButton';
import CreationModal from '@/components/CreationModal';
import EmptyList from '@/components/EmptyList';
import ListWrapper from '@/components/ListWrapper';
import { getAuthData } from '@/store/ducks/auth/selectors';

type ColumnScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Column>;

type FormValues = {
  title: string;
};

const Column = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<ColumnScreenProps['route']>();
  const { navigate } = useNavigation<ColumnScreenProps['navigation']>();
  const prayers = useAppSelector(rootSelectors.prayers.getPrayersState);
  const isLoading = useAppSelector(rootSelectors.prayers.getPrayersLoading);
  const user = useAppSelector(rootSelectors.auth.getAuthData);
  const showPrayers = !!prayers && !!prayers.length;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const isUser = user?.id === params.userId;
  useEffect(() => {
    dispatch(rootRoutines.prayers.getPrayers(params.id));
  }, [params.id]);

  const onSubmit = (data: FormValues) => {
    dispatch(
      rootRoutines.prayers.createPrayer({
        ...data,
        description: 'New prayer',
        columnId: params.id,
      }),
    );
  };

  if (isLoading) {
    return <Loader size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showPrayers ? (
        <ListWrapper>
          {prayers.map((item) => {
            return (
              <PrayerCard
                key={item.id}
                onPress={() =>
                  navigate(AuthRoutes.Prayer, {
                    id: item.id,
                    title: item.title,
                  })
                }
              >
                {item.title}
              </PrayerCard>
            );
          })}
        </ListWrapper>
      ) : (
        <EmptyList
          isUser={isUser}
          text={isUser ? 'You haven`t created any prayer' : 'The user has not created any prayers yet'}
        />
      )}
      {isUser ? (
        <View>
          <CreationModal
            isVisible={overlayVisible}
            onClose={() => setOverlayVisible(false)}
            title={'prayer'}
            onSubmit={onSubmit}
          />
          <IconButton size="big" variant="dark" style={styles.floatButton} onPress={() => setOverlayVisible(true)}>
            <PlusIcon fill={colors.color100} />
          </IconButton>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Column;
