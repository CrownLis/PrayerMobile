import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';

import styles from './Column.module.scss';
import { AuthRoutes } from '@/navigation/routes';
import PrayerCard from '@/components/PrayerCard';
import { rootSelectors, rootRoutines } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Loader from '@/UI/Loader';

import { Arrow, EmptyColumn, Plus as PlusIcon } from '@/assets/svgs';

import backgroundImg from '@/assets/images/background-1.png';
import { colors } from '@/assets/styles/color';
import IconButton from '@/UI/IconButton';
import CreationModal from '@/components/CreationModal';

type ColumnScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Column>;

type FormValues = {
  title: string;
};

const Column = () => {
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef(null);
  const { params } = useRoute<ColumnScreenProps['route']>();
  const { navigate } = useNavigation<ColumnScreenProps['navigation']>();
  const prayers = useAppSelector(rootSelectors.prayers.getPrayersState);
  const isLoading = useAppSelector(rootSelectors.prayers.getPrayersLoading);

  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    dispatch(rootRoutines.prayers.getPrayers(params.id));
  }, [params.id]);
  const showPrayers = !!prayers && !!prayers.length;

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
        <ScrollView ref={scrollViewRef}>
          <ImageBackground
            source={backgroundImg}
            resizeMode="cover"
            style={styles.background}
            imageStyle={styles.image}
          >
            <View style={styles.list}>
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
            </View>
          </ImageBackground>
        </ScrollView>
      ) : (
        <View style={styles.emptyColumn}>
          <EmptyColumn />
          <Text>You haven't created any prayers.</Text>
          <Arrow fill={colors.color800} style={styles.arrow} />
        </View>
      )}
      <View>
        <CreationModal
          isVisible={overlayVisible}
          onClose={() => setOverlayVisible(false)}
          title={'prayers'}
          onSubmit={onSubmit}
        />
        <IconButton size="big" variant="dark" style={styles.floatButton} onPress={() => setOverlayVisible(true)}>
          <PlusIcon fill={colors.color100} />
        </IconButton>
      </View>
    </SafeAreaView>
  );
};

export default Column;
