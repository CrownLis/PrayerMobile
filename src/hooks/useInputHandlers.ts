import { useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export const useInputHandlers = (
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
) => {
  const [isFocus, setIsFocus] = useState(false);

  const focusHandler = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocus(true);

      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const blurHandler = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocus(false);

      onBlur && onBlur(e);
    },
    [onBlur],
  );

  return { focusHandler, blurHandler, isFocus };
};
