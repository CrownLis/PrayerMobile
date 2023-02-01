import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { UserStackParamList } from '@/navigation/UserNavigation/UserNavigation';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '@/navigation/routes';

type FollowedScreenProps = NativeStackScreenProps<UserStackParamList, AuthRoutes.Root>;

const Followed = () => {
  const navigation = useNavigation<FollowedScreenProps['navigation']>();
  return (
    <SafeAreaView>
      <ScrollView />
    </SafeAreaView>
  );
};

export default Followed;
