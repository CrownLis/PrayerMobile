import React from 'react';
import { Greet } from '@/assets/svgs';
import { Text, View } from 'react-native';
import styles from './Greetings.module.scss';
import Button from '@/UI/Button';
import { GuestStackParamList } from '@/navigation/GuestNav/GuestNav';
import { rootRoutines } from '@/store/ducks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '@/store/hooks';

type Props = NativeStackScreenProps<GuestStackParamList, 'Greetings'>;

const Greetings = ({ route }: Props) => {
  const dispatch = useAppDispatch();
  const { email, name, password } = route.params;
  return (
    <View style={styles.container}>
      <Greet />
      <Text>You have been registered</Text>
      <Button
        variant="primary"
        style={styles.button}
        onPress={() => dispatch(rootRoutines.auth.signUp({ email: email, name: name, password: password }))}
      >
        Get started
      </Button>
    </View>
  );
};

export default Greetings;
