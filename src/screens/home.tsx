import React from 'react';
import {Text, View} from 'react-native';
import Button from '../UI/Button';
import DeleteButton from '../UI/DeleteButton';
import IconButton from '../UI/IconButton/IconButton';

const HomePage = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button type="primary" isLoading>
        Text
      </Button>
      <IconButton type="send" />
      <DeleteButton size="large" />
    </View>
  );
};

export default HomePage;
