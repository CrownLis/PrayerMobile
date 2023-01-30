import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import Button from '@/UI/Button';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { GuestStackParamList } from '@/navigation/GuestNav/GuestNav';
import { Greet } from '@/assets/svgs';

import styles from './Greetings.module.scss';

type Props = NativeStackScreenProps<GuestStackParamList, 'Greetings'>;

const Greetings = ({ route }: Props) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(rootSelectors.auth.getAuthState);

  const authUser = () => {
    dispatch(rootRoutines.auth.signUp(route.params));
  };

  return (
    <View style={styles.container}>
      <Greet />
      <Text style={styles.text}>You have been registered!</Text>
      <Button variant="primary" style={styles.button} onPress={authUser} isLoading={loading}>
        Get started
      </Button>
    </View>
  );
};

export default Greetings;
