import React, { FC } from 'react';
import { Dimensions, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import useButtonHandlers from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './DeskCard.module.scss';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import DeleteButton from '@/UI/DeleteButton';
import { ColumnType } from '@/types/data';
import { useAppDispatch } from '@/store/hooks';
import { rootRoutines } from '@/store/ducks';

type DeskCardProps = {
  columnId: ColumnType['id'];
} & TouchableOpacityProps;

const screenWidth = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -screenWidth.width * 0.17;

const DeskCard: FC<DeskCardProps> = ({ columnId, onPress, onPressIn, onPressOut, disabled, children, ...props }) => {
  const dispatch = useAppDispatch();
  const { isPressed, pressInHandler, pressOutHandler, pressHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
  );

  // ANIMATION //
  const translateX = useSharedValue(0);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-screenWidth);
        dispatch(rootRoutines.columns.deleteColumn(columnId));
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value < -57 ? -57 : translateX.value,
      },
    ],
  }));

  // ANIMATION //

  return (
    <View style={styles.container}>
      <DeleteButton />
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={rStyle}>
          <TouchableOpacity
            onPress={pressHandler}
            onPressIn={pressInHandler}
            onPressOut={pressOutHandler}
            disabled={disabled}
            {...props}
            style={[
              mergeStyles(
                { style: styles.touchable_container, active: true },
                { style: styles.container_pressed, active: isPressed },
              ),
            ]}
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
    </View>
  );
};

export default DeskCard;
