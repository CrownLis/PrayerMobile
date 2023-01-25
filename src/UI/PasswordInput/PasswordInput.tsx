import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Input, { InputProps } from '@UI/Input/Input';
import useInputHandlers from '@hooks/useInputHandlers';
import EyeClosedIcon from '@assets/svgs/EyeClosed';
import EyeOpenIcon from '@assets/svgs/EyeOpen';
import { colors } from '@assets/styles/color';

import styles from './PasswordInput.module.scss';

type PasswordInputProps = Omit<InputProps, 'secureTextEntry' | 'onPressRightIcon'>;

const PasswordInput: FC<PasswordInputProps> = ({ style, isDirty, isDisabled, isError, onFocus, onBlur, ...props }) => {
  const { focusHandler, blurHandler, isFocus } = useInputHandlers(onFocus, onBlur);

  const [showPassword, setShowPassword] = useState(false);

  const getIconColor = () => {
    if (isDisabled) {
      return colors.$color500;
    } else if (isError) {
      return colors.$Error;
    } else if (isDirty) {
      return colors.$Success;
    } else if (isFocus) {
      return colors.$color800;
    } else {
      return colors.$color600;
    }
  };

  return (
    <Input
      isDirty={isDirty}
      isDisabled={isDisabled}
      isError={isError}
      secureTextEntry={!showPassword}
      style={[styles.passwordInput, style]}
      onFocus={focusHandler}
      onBlur={blurHandler}
      postfix={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOpenIcon width={20} height={20} fill={getIconColor()} />
          ) : (
            <EyeClosedIcon width={20} height={20} fill={getIconColor()} />
          )}
        </TouchableOpacity>
      }
      {...props}
    />
  );
};

export default PasswordInput;
