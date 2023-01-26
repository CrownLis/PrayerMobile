import useButtonHandlers from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';
import React, { FC } from 'react';
import { Text, TouchableOpacityProps, TouchableOpacity } from 'react-native';
import styles from './DeskCard.module.scss';

type DeskCardProps = TouchableOpacityProps;

const DeskCard: FC<DeskCardProps> = ({ onPress, onPressIn, onPressOut, disabled, ...props }) => {
  const { isPressed, pressInHandler, pressOutHandler } = useButtonHandlers(onPressIn, onPressOut);

  return (
    <TouchableOpacity
      style={mergeStyles(
        { style: styles.container, active: true },
        { style: styles.container_pressed, active: isPressed },
      )}
      onPress={onPress}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      disabled={disabled}
      {...props}
    >
      <Text
        style={mergeStyles(
          { style: styles.title, active: true },
          { style: styles.title_disabled, active: disabled ? true : false },
        )}
      >
        Text
      </Text>
    </TouchableOpacity>
  );
};

export default DeskCard;
