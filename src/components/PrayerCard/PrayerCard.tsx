import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { PrayArms } from '@/assets/svgs';
import IconButton from '@/UI/IconButton';
import styles from './PrayerCard.module.scss';
import { useButtonHandlers } from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';
import SwiperWrapper from '../SwiperWrapper';
import { PrayerType } from '@/types/data';
import { colors } from '@/assets/styles/color';
import { useAppDispatch } from '@/store/hooks';
import { rootRoutines } from '@/store/ducks';

type PrayerCardProps = {
  id: PrayerType['id'];
  title: string;
  members: PrayerType['subscribersCount'];
  complete: PrayerType['completesCount'];
  onDismiss: () => void;
} & TouchableOpacityProps;

const LIST_ITEM_HEIGHT = 95;

const formatCount = (count: number, maxCount: number) => {
  if (count <= maxCount) {
    return count;
  }
  return `${maxCount}+`;
};

const PrayerCard: FC<PrayerCardProps> = ({
  onPress,
  onDismiss,
  onPressIn,
  onPressOut,
  id,
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

  const dispatch = useAppDispatch();

  const pray = () => {
    dispatch(rootRoutines.prayers.doPray(id));
  };

  return (
    <SwiperWrapper listItemHeight={LIST_ITEM_HEIGHT} onDismiss={onDismiss}>
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
              <Text style={styles.description}>
                Members <Text style={styles.count}>{formatCount(members, 99)}</Text>
              </Text>
              <Text style={styles.description}>
                Complete <Text style={styles.count}>{formatCount(complete, 999)}</Text>
              </Text>
            </View>
          </View>
          <IconButton size="middle" variant="light" onPress={pray}>
            <PrayArms fill={colors.color800} />
          </IconButton>
        </View>
      </TouchableOpacity>
    </SwiperWrapper>
  );
};

export default PrayerCard;
