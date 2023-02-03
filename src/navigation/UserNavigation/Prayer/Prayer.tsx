import React, { FC, useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './Prayer.module.scss';
import { mergeStyles } from '@/utils/mergeStyles';
import { AuthRoutes } from '@/navigation/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParamList } from '../UserNavigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRoute } from '@react-navigation/native';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import Button from '@/UI/Button';
import Comment from '@/components/Comment';
import CommentInput from '@/UI/CommentInput';

type PrayerScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Prayer>;

const Prayer: FC<PrayerScreenProps> = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<PrayerScreenProps['route']>();
  const prayer = useAppSelector(rootSelectors.prayers.getPrayersState);
  const isLoading = useAppSelector(rootSelectors.prayers.getPrayersLoading);
  useEffect(() => {}, [params.id]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.prayerBlock}>
            <ImageBackground
              source={backgroundImg}
              resizeMode="cover"
              style={styles.background}
              imageStyle={{ borderRadius: 24 }}
            >
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.first, active: true })}>
                <Text style={styles.titleStats}>Date</Text>
                <Text style={styles.stats}>01.01.2021</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.second, active: true })}>
                <Text style={styles.titleStats}>Total prayers</Text>
                <Text style={styles.stats}>333</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.third, active: true })}>
                <Text style={styles.titleStats}>Other prayers</Text>
                <Text style={styles.stats}> 456</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.fourth, active: true })}>
                <Text style={styles.titleStats}>My prayers</Text>
                <Text style={styles.stats}>60</Text>
              </View>
            </ImageBackground>
            <Button variant="primary" style={styles.prayedButton}>
              Prayed
            </Button>
            <Button variant="secondary" style={styles.followButton}>
              Followed
            </Button>
          </View>
        </View>
        <View style={styles.commentBlock}>
          <Text style={styles.title}>Comments</Text>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <CommentInput style={styles.input} />
      </View>
    </SafeAreaView>
  );
};

export default Prayer;
