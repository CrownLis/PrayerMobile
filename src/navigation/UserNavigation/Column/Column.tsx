import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '@/assets/styles/color';
import { Plus as PlusIcon } from '@/assets/svgs';
import CreationModal from '@/components/CreationModal';
import EmptyList from '@/components/EmptyList';
import PrayerCard from '@/components/PrayerCard';
import { AuthRoutes } from '@/navigation/routes';
import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PrayerType } from '@/types/data';
import IconButton from '@/UI/IconButton';
import Loader from '@/UI/Loader';

import styles from './Column.module.scss';

type ColumnScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Column>;

type FormValues = {
  title: string;
};

const Column = () => {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const { params } = useRoute<ColumnScreenProps['route']>();
  const { navigate } = useNavigation<ColumnScreenProps['navigation']>();

  const prayers = useAppSelector(rootSelectors.prayers.getPrayersState);
  const isLoading = useAppSelector(rootSelectors.prayers.getPrayersLoading);
  const user = useAppSelector(rootSelectors.auth.getAuthData);

  const showPrayers = !!prayers && !!prayers.length;
  const isFetching = isLoading && !prayers;
  const isUser = user?.id === params.userId;

  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.prayers.getPrayers(params.id));
      return () => {
        dispatch(rootRoutines.prayers.cleanPrayers());
      };
    }
  }, [isFocused, params.id]);

  const onSubmit = (data: FormValues) => {
    dispatch(
      rootRoutines.prayers.createPrayer({
        ...data,
        description: 'New prayer',
        columnId: params.id,
      }),
    );
  };

  const handleDelete = (prayerId: PrayerType['id']) => {
    dispatch(rootRoutines.prayers.deletePrayer(prayerId));
  };

  if (isFetching) {
    return <Loader size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showPrayers ? (
        <ScrollView>
          {prayers.map((item) => {
            return (
              <PrayerCard
                title={item.title}
                members={item.subscribersCount}
                complete={item.completesCount}
                key={item.id}
                id={item.id}
                onDismiss={() => handleDelete(item.id)}
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
        </ScrollView>
      ) : (
        <EmptyList
          showArrow={isUser}
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
