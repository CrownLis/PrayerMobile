import React, { FC } from 'react';

import Input, { InputProps } from '@/UI/Input/Input';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './CommentInput.module.scss';

export type CommentInputProps = {
  isDisabled?: boolean;
} & Omit<InputProps, 'secureTextEntry' | 'isDirty' | 'isError'>;

const CommentInput: FC<CommentInputProps> = ({ isDisabled, onFocus, onBlur, style, ...props }) => {
  return (
    <Input
      isDisabled={isDisabled}
      isDirty={false}
      isError={false}
      secureTextEntry={false}
      onFocus={onFocus}
      onBlur={onBlur}
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
  );
};

export default CommentInput;
