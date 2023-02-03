import DeleteButton from '@/UI/DeleteButton';
import React, { FC, PropsWithChildren } from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './SwiperWrapper.module.scss';

const SCREEN_WIDTH = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH.width * 0.17;

type SwiperWrapperProps = PropsWithChildren<{
  listItemHeight: number;
  onDismiss?: () => void;
}>;

const SwiperWrapper: FC<SwiperWrapperProps> = ({ children, listItemHeight, onDismiss }) => {
  const isAnimation = !!onDismiss;

  // ANIMATION //
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(listItemHeight);
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
      <PanGestureHandler onGestureEvent={isAnimation ? panGesture : undefined}>
        <Animated.View style={rStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SwiperWrapper;
