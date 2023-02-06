import React, { FC, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CommentBlock from '@/components/CommentBlock';
import PrayedErrorModal from '@/components/PrayedErrorModal';
import PrayerBlock from '@/components/PrayerBlock';
import { AuthRoutes } from '@/navigation/routes';
import { rootRoutines } from '@/store/ducks';
import { useAppDispatch } from '@/store/hooks';
import CommentInput from '@/UI/CommentInput';

import { UserStackParamList } from '../UserNavigation';

import styles from './Prayer.module.scss';

type PrayerScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Prayer>;

const Prayer: FC<PrayerScreenProps> = () => {
  const dispatch = useAppDispatch();

  const { params } = useRoute<PrayerScreenProps['route']>();

  const [commentText, setCommentText] = useState('');

  const onSend = () => {
    if (commentText !== '') {
      dispatch(
        rootRoutines.comments.createComment({
          body: commentText,
          prayerId: params.id,
        }),
      );
      setCommentText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PrayedErrorModal />
      <ScrollView>
        <View style={styles.wrapper}>
          <PrayerBlock id={params.id} />
        </View>
        <CommentBlock id={params.id} />
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
