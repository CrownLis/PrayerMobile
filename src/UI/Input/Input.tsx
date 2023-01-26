import React, { FC, useMemo } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { mergeStyles } from '@/utils/mergeStyles';
import useInputHandlers from '@/hooks/useInputHandlers';
import CheckIcon from '@/assets/svgs/Check';
import { colors } from '@/assets/styles/color';

import styles from './Input.module.scss';

export type InputProps = {
  isDisabled?: boolean;
  isDirty?: boolean;
  isError?: boolean;
  postfix?: React.ReactNode;
} & TextInputProps;

const Input: FC<InputProps> = ({
  placeholder,
  isDirty,
  isDisabled,
  isError,
  secureTextEntry,
  onFocus,
  onBlur,
  style,
  postfix,
  ...props
}) => {
  const { focusHandler, blurHandler, isFocus } = useInputHandlers(onFocus, onBlur);

  const resolvedPostfix = useMemo(() => {
    if (isDirty && !isError) {
      return <CheckIcon width={20} height={20} fill={colors.$Success} />;
    }
    return postfix;
  }, [isDirty, isError, postfix]);

  return (
    <View style={mergeStyles({ style: styles.inputContainer, active: true })}>
      <TextInput
        style={[
          mergeStyles(
            { style: styles.customInput, active: true },
            {
              style: styles.customInput_active,
              active: !!isFocus,
            },
            {
              style: styles.customInput_disabled,
              active: !!isDisabled,
            },
            {
              style: styles.customInput_correct,
              active: !!isDirty,
            },
            {
              style: styles.customInput_error,
              active: !!isError,
            },
          ),
          style,
        ]}
        placeholderTextColor={colors.$color600}
        placeholder={placeholder}
        onFocus={focusHandler}
        onBlur={blurHandler}
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {resolvedPostfix ? <View style={styles.postfix}>{resolvedPostfix}</View> : null}
    </View>
  );
};

export default Input;
