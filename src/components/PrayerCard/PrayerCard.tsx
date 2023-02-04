import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { PrayArms } from '@/assets/svgs';
import IconButton from '@/UI/IconButton';
import styles from './PrayerCard.module.scss';
import { useButtonHandlers } from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';
import SwiperWrapper from '../SwiperWrapper';
import { PrayerType } from '@/types/data';

type PrayerCardProps = {
  title: string;
  members: PrayerType['subscribersCount'];
  complete: PrayerType['completesCount'];
  onDismiss: () => void;
} & TouchableOpacityProps;

const PrayerCard: FC<PrayerCardProps> = ({
  onPress,
  onDismiss,
  onPressIn,
  onPressOut,
  title,
  complete,
  members,
  ...props
}) => {
  const { isPressed, pressInHandler, pressOutHandler, pressHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
  );

  return (
    <SwiperWrapper listItemHeight={95} onDismiss={onDismiss}>
      <TouchableOpacity
        style={mergeStyles(
          { style: styles.wrapper, active: true },
          { style: styles.wrapper_pressed, active: isPressed },
        )}
        onPress={pressHandler}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        {...props}
      >
        <View style={styles.container}>
          <View style={styles.container_color} />
          <View style={styles.container_info}>
            <Text style={styles.info_title}>{title}</Text>
            <View style={styles.info_description}>
              <Text style={styles.description}>Members {members}</Text>
              <Text style={styles.description}>Complete {complete}</Text>
            </View>
          </View>
          <IconButton size="small" variant="light">
            <PrayArms fill="black" />
          </IconButton>
        </View>
      </TouchableOpacity>
    </SwiperWrapper>
  );
};

export default PrayerCard;
