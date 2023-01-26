import DeskCard from '@/components/DeskCard';
import PrayerCard from '@/components/PrayerCard';
import React from 'react';
import { Text, View } from 'react-native';

const Followed = () => {
  return (
    <View>
      <Text>Followed</Text>
      <DeskCard />
      <PrayerCard />
    </View>
  );
};

export default Followed;
