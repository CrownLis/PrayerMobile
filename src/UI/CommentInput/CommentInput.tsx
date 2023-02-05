import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { colors } from '@/assets/styles/color';
import { PaperAirplane } from '@/assets/svgs';
import { useInputHandlers } from '@/hooks/useInputHandlers';
import Input, { InputProps } from '@/UI/Input/Input';
import { mergeStyles } from '@/utils/mergeStyles';

import IconButton from '../IconButton';

import styles from './CommentInput.module.scss';

export type CommentInputProps = {
  onSend: () => void;
  isDisabled?: boolean;
} & Omit<InputProps, 'secureTextEntry' | 'isDirty' | 'isError'>;

const CommentInput: FC<CommentInputProps> = ({ isDisabled, onFocus, onBlur, style, onSend, ...props }) => {
  const { blurHandler, focusHandler, isFocus } = useInputHandlers(onFocus, onBlur);

  return (
    <View style={styles.container}>
      <Input
        isDisabled={isDisabled}
        isDirty={false}
        isError={false}
        secureTextEntry={false}
        onFocus={focusHandler}
        onBlur={blurHandler}
        style={[
          mergeStyles(
            { style: styles.commentInput, active: true },
            {
              style: styles.commentInput_disabled,
              active: !!isDisabled,
            },
          ),
          style,
        ]}
        icon={null}
        {...props}
      />
      <IconButton
        size={'big'}
        variant={'dark'}
        isSquare
        style={isFocus ? styles.showIcon : styles.hideIcon}
        onPress={onSend}
      >
        <PaperAirplane fill={colors.color100} />
      </IconButton>
    </View>
  );
};

export default CommentInput;
