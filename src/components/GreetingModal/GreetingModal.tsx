import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from '@rneui/base';

import { Greet } from '@/assets/svgs';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@/UI/Button';

import styles from './GreetingModal.module.scss';

const GreetingModal = () => {
  const user = useAppSelector(rootSelectors.auth.getAuthData);
  const isGreetings = useAppSelector(rootSelectors.auth.getIsGreetings);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(!isGreetings);

  const handlePress = async () => {
    if (user) {
      dispatch(rootRoutines.auth.setGreeting(user.id));
    }
    setShow(false);
  };

  return (
    <Overlay fullScreen focusable isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.container}>
        <Greet />
        <Text style={styles.text}>You have been registered!</Text>
        <Button variant="primary" style={styles.button} onPress={handlePress}>
          Get started
        </Button>
      </View>
    </Overlay>
  );
};

export default GreetingModal;
