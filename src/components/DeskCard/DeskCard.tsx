import React, { FC } from 'react';
import { Dimensions, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler';

import { useButtonHandlers } from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';
import DeleteButton from '@/UI/DeleteButton';

import styles from './DeskCard.module.scss';

type DeskCardProps = {
  onDismiss?: () => void;
} & TouchableOpacityProps &
  Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;

const SCREEN_WIDTH = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH.width * 0.17;
const LIST_ITEM_HEIGHT = 76;

const DeskCard: FC<DeskCardProps> = ({
  onDismiss,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  children,
  style,
  simultaneousHandlers,
  ...props
}) => {
  const { isPressed, pressInHandler, pressOutHandler, pressHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
  );

  const isAnimation = !!onDismiss;

  // ANIMATION //
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (event.translationX <= 0) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer]}>
        <DeleteButton />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={isAnimation ? panGesture : undefined}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View
          style={[
            mergeStyles({ style: styles.card, active: true }, { style: styles.card_pressed, active: isPressed }),
            rStyle,
          ]}
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
      </PanGestureHandler>
    </Animated.View>
  );
};

export default DeskCard;
