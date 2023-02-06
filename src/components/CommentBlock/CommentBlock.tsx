import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PrayerType } from '@/types/data';
import Loader from '@/UI/Loader';

import Comment from '../Comment/Comment';

import styles from './CommentBlock.module.scss';

type CommentBlockProps = {
  id: PrayerType['id'];
};

const CommentBlock: FC<CommentBlockProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(rootSelectors.comments.getCommentsState);
  const isLoadingComments = useAppSelector(rootSelectors.comments.getCommentsLoading);
  const isFetchingComments = isLoadingComments && !comments;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(rootRoutines.comments.getComments({ id: id, limit: 100 }));
      return () => {
        dispatch(rootRoutines.comments.cleanComments());
      };
    }
  }, [id]);

  return (
    <View style={styles.commentBlock}>
      <Text style={styles.title}>Comments</Text>
      {isFetchingComments ? (
        <Loader size="large" />
      ) : (
        <View>
          {comments?.map((item) => (
            <Comment author={item.userId} date={item.createdAt} comment={item.body} key={item.id} />
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentBlock;
