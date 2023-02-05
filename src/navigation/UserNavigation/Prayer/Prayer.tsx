import React, { FC, useEffect, useState } from 'react';
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
import { AppState } from '@/store/configureStore';
import convertTime from '@/utils/convertTime';

type PrayerScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Prayer>;

const Prayer: FC<PrayerScreenProps> = () => {
  const { params } = useRoute<PrayerScreenProps['route']>();
  const prayer = useAppSelector((state: AppState) => rootSelectors.prayers.getPrayerById(state, params.id));
  const dispatch = useAppDispatch();
  const comments = useAppSelector(rootSelectors.comments.getCommentsState);
  const pray = () => {
    dispatch(rootRoutines.prayers.doPray(params.id));
  };
  const [commentText, setCommentText] = useState('');

  const onSend = () => {
    if (commentText !== '') {
      console.log(commentText);
      setCommentText('');
    }
  };

  useEffect(() => {
    dispatch(rootRoutines.comments.getComments(params.id));
  }, []);

  if (!prayer) {
    return null;
  }

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
                <Text style={styles.stats}>{convertTime(prayer?.createdAt)}</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.second, active: true })}>
                <Text style={styles.titleStats}>Total prayers</Text>
                <Text style={styles.stats}>{prayer?.completesCount}</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.third, active: true })}>
                <Text style={styles.titleStats}>Other prayers</Text>
                <Text style={styles.stats}> {prayer?.otherPrayCount}</Text>
              </View>
              <View style={mergeStyles({ style: styles.block, active: true }, { style: styles.fourth, active: true })}>
                <Text style={styles.titleStats}>My prayers</Text>
                <Text style={styles.stats}>{prayer?.myPrayCount} </Text>
              </View>
            </ImageBackground>
            <Button variant="primary" style={styles.prayedButton} onPress={pray}>
              Prayed
            </Button>
            <Button variant="secondary" style={styles.followButton}>
              Followed
            </Button>
          </View>
        </View>
        <View style={styles.commentBlock}>
          <Text style={styles.title}>Comments</Text>
          {comments?.map((item) => (
            <Comment author={item.userId} date={item.createdAt} comment={item.body} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <CommentInput
          style={styles.input}
          value={commentText}
          onChangeText={(e) => setCommentText(e)}
          onSend={onSend}
        />
      </View>
    </SafeAreaView>
  );
};

export default Prayer;
