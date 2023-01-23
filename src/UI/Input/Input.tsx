import React, { FC, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { mergeStyles } from '../../utils/mergeStyles';
import CheckIcon from '~assets/icons/check.svg';
import EyeIcon from '~assets/icons/eye-open.svg';
import EyeClosedIcon from '~assets/icons/eye-closed.svg';

import styles from './Input.module.scss';

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
  secureTextEntry,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry ? true : false);
  useEffect(() => {
    setIcon();
  }, [isDirty, isError, showPassword]);

  const setIcon = () => {
    if (isDirty && !isError) {
      return <CheckIcon fill="#39C622" />;
    }
    if (secureTextEntry) {
      if (isDisabled) {
        <EyeIcon fill="#CFCFCF" />;
      } else if (showPassword && !isFocus) {
        return (
          <EyeClosedIcon fill="#CFCFCF" onPress={() => setShowPassword(!showPassword)} />
        );
      } else if (!showPassword && !isFocus) {
        return <EyeIcon fill="#CFCFCF" onPress={() => setShowPassword(!showPassword)} />;
      } else if (showPassword && isDirty && isError) {
        return (
          <EyeClosedIcon fill="#C2534C" onPress={() => setShowPassword(!showPassword)} />
        );
      } else if (!showPassword && isDirty && isError) {
        return <EyeIcon fill="#C2534C" onPress={() => setShowPassword(!showPassword)} />;
      } else if (showPassword) {
        return <EyeIcon onPress={() => setShowPassword(!showPassword)} fill="#2A2A2A" />;
      } else if (!showPassword) {
        return (
          <EyeClosedIcon onPress={() => setShowPassword(!showPassword)} fill="#2A2A2A" />
        );
      }
    }
  };

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
          secureTextEntry={showPassword}
          {...props}
        />
        {setIcon()}
      </View>
    </View>
  );
};

export default Input;
