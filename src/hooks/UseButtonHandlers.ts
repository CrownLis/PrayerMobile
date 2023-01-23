import { GestureResponderEvent } from 'react-native';
import { useCallback, useState } from 'react';

export const useButtonHandlers = (
  onPressIn: (event: GestureResponderEvent) => void,
  onPressOut: (event: GestureResponderEvent) => void,
  onPress: (event: GestureResponderEvent) => void,
  isLoading?: boolean,
) => {
  const [isPressed, setIsPressed] = useState(false);

  const pressInHandler = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(true);

      onPressIn && onPressIn(e);
    },
    [onPressIn],
  );

  const pressOutHandler = useCallback(
    (e: GestureResponderEvent) => {
      setIsPressed(false);

      onPressOut && onPressOut(e);
    },
    [onPressOut],
  );

  const pressHandler = useCallback(
    (e: GestureResponderEvent) => {
      if (!isLoading) {
        onPress && onPress(e);
      }
    },
    [isLoading, onPress],
  );

  return { pressHandler, pressInHandler, pressOutHandler, isPressed };
};
