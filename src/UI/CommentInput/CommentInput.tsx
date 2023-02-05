import React, { FC, useState } from 'react';

import Input, { InputProps } from '@/UI/Input/Input';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './CommentInput.module.scss';
import { View } from 'react-native';
import IconButton from '../IconButton';
import { PaperAirplane } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';
import { useInputHandlers } from '@/hooks/useInputHandlers';

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
