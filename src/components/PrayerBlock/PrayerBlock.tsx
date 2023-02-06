import React, { FC, useEffect } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import backgroundImg from '@/assets/images/background-1.png';
import { AppState } from '@/store/configureStore';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PrayerType } from '@/types/data';
import Button from '@/UI/Button';
import Loader from '@/UI/Loader';
import convertTime from '@/utils/convertTime';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './PrayerBlock.module.scss';

type PrayerBlockProps = {
  id: PrayerType['id'];
};

const PrayerBlock: FC<PrayerBlockProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(rootSelectors.prayers.getPrayersLoading);
  const isFocused = useIsFocused();
  const pray = () => {
    dispatch(rootRoutines.prayers.doPray(id));
  };

  const subscribe = () => {
    dispatch(rootRoutines.prayers.doSubscribe(id));
  };

  const unsubscribe = () => {
    dispatch(rootRoutines.prayers.doUnsubscribe(id));
  };

  const prayer = useAppSelector((state: AppState) => rootSelectors.prayers.getPrayerById(state, id));

  const isFetchingPrayer = isLoading && !prayer;

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.prayers.getPrayer(id));
      return () => {
        dispatch(rootRoutines.prayers.cleanPrayers());
      };
    }
  }, [id]);

  if (isFetchingPrayer) {
    return <Loader size="large" />;
  }

  if (!prayer) {
    return null;
  }

  return (
    <View style={styles.prayerBlock}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.background}
        imageStyle={{ borderRadius: 24 }}
      >
        <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.first, active: true })}>
          <Text style={styles.titleStats}>Date</Text>
          <Text style={styles.stats}>{convertTime(prayer?.createdAt)}</Text>
        </View>
        <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.second, active: true })}>
          <Text style={styles.titleStats}>Total prayers</Text>
          <Text style={styles.stats}>{prayer?.completesCount ?? 0}</Text>
        </View>
        <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.third, active: true })}>
          <Text style={styles.titleStats}>Other prayers</Text>
          <Text style={styles.stats}> {prayer?.otherPrayCount ?? 0}</Text>
        </View>
        <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.fourth, active: true })}>
          <Text style={styles.titleStats}>My prayers</Text>
          <Text style={styles.stats}>{prayer?.myPrayCount ?? 0} </Text>
        </View>
      </ImageBackground>
      <Button variant="primary" style={styles.prayedButton} onPress={pray}>
        Prayed
      </Button>
      <Button variant="secondary" style={styles.followButton} onPress={subscribe}>
        Followed
      </Button>
      <Button variant="secondary" style={styles.followButton} onPress={unsubscribe}>
        unsubscribe
      </Button>
    </View>
  );
};

export default PrayerBlock;
