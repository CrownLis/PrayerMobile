import React, { FC } from 'react';
import { Text } from 'react-native';
import { ListItem, ListItemSwipeableProps } from '@rneui/base';

import useButtonHandlers from '@/hooks/useButtonHandlers';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './DeskCard.module.scss';

type DeskCardProps = ListItemSwipeableProps;

const DeskCard: FC<DeskCardProps> = ({
  style,
  containerStyle,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  children,
  ...props
}) => {
  const { isPressed, pressInHandler, pressOutHandler, pressHandler } = useButtonHandlers(
    onPressIn,
    onPressOut,
    onPress,
  );

  return (
    <ListItem
      style={style}
      onPress={pressHandler}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      disabled={disabled}
      containerStyle={[
        mergeStyles({ style: styles.container, active: true }, { style: styles.container_pressed, active: isPressed }),
        containerStyle,
      ]}
      {...props}
    >
      <Text
        style={mergeStyles(
          { style: styles.title, active: true },
          { style: styles.title_disabled, active: disabled ? true : false },
        )}
      >
        {children}
      </Text>
    </ListItem>
  );
};

export default DeskCard;
