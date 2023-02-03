import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';

import { useButtonHandlers } from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './DeskCard.module.scss';
import SwiperWrapper from '../SwiperWrapper';

type DeskCardProps = {
  onDismiss?: () => void;
} & TouchableOpacityProps &
  Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;

const LIST_ITEM_HEIGHT = 76;

const DeskCard: FC<DeskCardProps> = ({
  onDismiss,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  children,
  style,
  ...props
}) => {
  const { isPressed, pressInHandler, pressOutHandler, pressHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
  );

  return (
    <SwiperWrapper listItemHeight={LIST_ITEM_HEIGHT} onDismiss={onDismiss}>
      <Animated.View
        style={[mergeStyles({ style: styles.card, active: true }, { style: styles.card_pressed, active: isPressed })]}
      >
        <TouchableOpacity
          onPress={pressHandler}
          onPressIn={pressInHandler}
          onPressOut={pressOutHandler}
          disabled={disabled}
          style={[styles.touchable, style]}
          {...props}
        >
          <Text
            style={mergeStyles(
              { style: styles.title, active: true },
              { style: styles.title_disabled, active: disabled ? true : false },
            )}
          >
            {children}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SwiperWrapper>
  );
};

export default DeskCard;
