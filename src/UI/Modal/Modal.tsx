import React, { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Overlay, OverlayProps } from '@rneui/base';

import { colors } from '@/assets/styles/color';
import { Close as CloseIcon } from '@/assets/svgs';
import IconButton from '@/UI/IconButton';
import { mergeStyles } from '@/utils/mergeStyles';

import styles from './Modal.module.scss';

type ModalProps = OverlayProps & {
  title: string;
  showCross?: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({
  title,
  children,
  style,
  backdropStyle,
  onClose,
  onBackdropPress = onClose,
  showCross = false,
  ...props
}) => {
  return (
    <Overlay
      onBackdropPress={onBackdropPress}
      backdropStyle={[styles.backdrop, backdropStyle]}
      overlayStyle={[
        styles.overlay,
        {
          width: Dimensions.get('window').width - 16 * 2,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.overlayContent}>
        <View style={styles.overlayHeader}>
          <Text
            style={mergeStyles(
              { style: styles.overlayTitle, active: true },
              {
                style: styles.overlayTitleCenter,
                active: !showCross,
              },
            )}
          >
            {title}
          </Text>
          {showCross && (
            <IconButton size="small" variant="light" onPress={onBackdropPress}>
              <CloseIcon fill={colors.color800} />
            </IconButton>
          )}
        </View>
        {children}
      </View>
    </Overlay>
  );
};

export default Modal;
