import React, { FC, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { Check } from '~assets/svgs';
import { mergeStyles } from '../../utils/mergeStyles';

import styles from './Input.module.scss';
import { colors } from '~assets/styles/color';

type InputProps = {
  isDisabled?: boolean;
  isDirty?: boolean;
  isError?: boolean;
} & TextInputProps;

const Input: FC<InputProps> = ({
  placeholder,
  isDirty,
  isDisabled,
  isError,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(true);
    onFocus?.(e);
  };

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocus(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      <View
        style={mergeStyles(
          { style: styles.inputContainer, active: true },
          {
            style: styles.inputContainer_disabled,
            active: !!isDisabled,
          },
          {
            style: styles.inputContainer_correct,
            active: Boolean(isDirty),
          },
          {
            style: styles.inputContainer_error,
            active: !!isError,
          },
        )}
      >
        <TextInput
          style={mergeStyles(
            { style: styles.customInput, active: true },
            {
              style: styles.customInput_disabled,
              active: !!isDisabled,
            },
            {
              style: styles.customInput_correct,
              active: Boolean(isDirty),
            },
            {
              style: styles.customInput_error,
              active: !!isError,
            },
          )}
          placeholderTextColor={styles.placeholder.color}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          editable={isDisabled ? false : true}
          selectTextOnFocus={isDisabled ? false : true}
          {...props}
        />
        {isDirty && !isError ? <Check fill={colors.$Success} /> : null}
      </View>
    </View>
  );
};

export default Input;
