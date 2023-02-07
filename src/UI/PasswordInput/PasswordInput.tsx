import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { colors } from '@/assets/styles/color';
import EyeClosedIcon from '@/assets/svgs/EyeClosed';
import EyeOpenIcon from '@/assets/svgs/EyeOpen';
import { useInputHandlers } from '@/hooks/useInputHandlers';
import Input, { InputProps } from '@/UI/Input/Input';

import styles from './PasswordInput.module.scss';

type PasswordInputProps = Omit<InputProps, 'secureTextEntry' | 'onPressRightIcon'>;

const PasswordInput: FC<PasswordInputProps> = ({ style, isDirty, isDisabled, isError, onFocus, onBlur, ...props }) => {
  const { focusHandler, blurHandler, isFocus } = useInputHandlers(onFocus, onBlur);

  const [showPassword, setShowPassword] = useState(false);

  const iconColor = isDisabled
    ? colors.color500
    : isError
    ? colors.Error
    : isDirty
    ? colors.Success
    : isFocus
    ? colors.color800
    : colors.color600;

  return (
    <Input
      isDirty={isDirty}
      isDisabled={isDisabled}
      isError={isError}
      secureTextEntry={!showPassword}
      style={[styles.passwordInput, style]}
      onFocus={focusHandler}
      onBlur={blurHandler}
      icon={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOpenIcon width={20} height={20} fill={iconColor} />
          ) : (
            <EyeClosedIcon width={20} height={20} fill={iconColor} />
          )}
        </TouchableOpacity>
      }
      {...props}
    />
  );
};

export default PasswordInput;
