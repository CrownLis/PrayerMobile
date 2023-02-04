import React, { FC, useState } from 'react';

import Input, { InputProps } from '@/UI/Input/Input';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './CommentInput.module.scss';
import { View } from 'react-native';
import IconButton from '../IconButton';
import { PaperAirplane } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';

export type CommentInputProps = {
  isDisabled?: boolean;
} & Omit<InputProps, 'secureTextEntry' | 'isDirty' | 'isError'>;

const CommentInput: FC<CommentInputProps> = ({ isDisabled, onFocus, onBlur, style, ...props }) => {
  const [isFocus, setIsFocus] = useState(false);

  const focus = () => {
    setIsFocus(true);
    return onFocus;
  };

  const blur = () => {
    setIsFocus(false);
    return onBlur;
  };

  return (
    <View style={styles.container}>
      <Input
        isDisabled={isDisabled}
        isDirty={false}
        isError={false}
        secureTextEntry={false}
        onFocus={focus}
        onBlur={blur}
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
      <IconButton size={'big'} variant={'dark'} isSquare style={isFocus ? styles.showIcon : styles.hideIcon}>
        <PaperAirplane fill={colors.color100} />
      </IconButton>
    </View>
  );
};

export default CommentInput;
