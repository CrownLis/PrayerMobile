import DeskCard from '@/components/DeskCard';
import PrayerCard from '@/components/PrayerCard';
import { rootRoutines } from '@/store/ducks';
import { getIsAuth } from '@/store/ducks/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@/UI/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const Followed = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  console.log(isAuth);
  const HandleLogOut = () => {
    dispatch(rootRoutines.auth.logOut());
    AsyncStorage.removeItem('token');
  };

  return (
    <View>
      <ScrollView>

     
      <Text>Followed</Text>
      <DeskCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <PrayerCard />
      <Button variant="primary" onPress={HandleLogOut}>
        Log out
      </Button>
       </ScrollView>
    </View>
  );
};

export default Followed;
