import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { CommentType } from '@/types/data';
import { convertTime } from '@/utils/convertTime';

import styles from './Comment.module.scss';

type CommentProps = {
  author: CommentType['userId'];
  date: CommentType['createdAt'];
  comment: CommentType['body'];
};

const Comment: FC<CommentProps> = ({ author, comment, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>Author {author}</Text>
        <Text style={styles.date}>Date {convertTime(date)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  );
};

export default Comment;
