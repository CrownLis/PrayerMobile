import React, { FC } from 'react';
import { View, Text } from 'react-native';

import styles from './Comment.module.scss';

const Comment: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>Author</Text>
        <Text style={styles.date}>Date</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.comment}>Comment text</Text>
      </View>
    </View>
  );
};

export default Comment;
