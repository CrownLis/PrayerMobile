import { GestureResponderEvent } from 'react-native';
import { useCallback, useState } from 'react';

const useButtonHandlers = (
  onPressIn?: ((event: GestureResponderEvent) => void) | null,
  onPressOut?: ((event: GestureResponderEvent) => void) | null,
  onPress?: ((event: GestureResponderEvent) => void) | null,
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

export default useButtonHandlers;
