import React from 'react';
import Svg, { Path } from 'react-native-svg';
import AddIcon from '~assets/icons/plus.svg';
import SendIcon from '~assets/icons/paper-airplane.svg';
import PrayIcon from '~assets/icons/pray-arms.svg';
import BackIcon from '~assets/icons/back.svg';
import ExitIcon from '~assets/icons/exit.svg';
import CloseIcon from '~assets/icons/close.svg';

type IconProps = {
  type: 'add' | 'send' | 'pray' | 'back' | 'exit' | 'cancel';
  height?: number;
  width?: number;
  isDisabled?: boolean;
};

export const getIcon = (
  type: IconProps['type'],
  isDisabled: IconProps['isDisabled'],
  height: IconProps['height'],
  width: IconProps['width'],
) => {
  if (type === 'add') {
    return <AddIcon height={height ?? 24} width={width ?? 24} />;
  }
  if (type === 'send') {
    return <SendIcon height={height ?? 24} width={width ?? 24} />;
  }
  if (type === 'pray') {
    return (
      <PrayIcon
        height={height ?? 18}
        width={width ?? 18}
        fill={isDisabled ? '#CFCFCF' : '#2A2A2A'}
      />
    );
  }
  if (type === 'back') {
    return (
      <BackIcon
        height={height ?? 18}
        width={width ?? 18}
        fill={isDisabled ? '#CFCFCF' : '#2A2A2A'}
        stroke={isDisabled ? '#CFCFCF' : '#2A2A2A'}
      />
    );
  }
  if (type === 'exit') {
    return (
      <ExitIcon
        height={height ?? 18}
        width={width ?? 18}
        fill={isDisabled ? '#CFCFCF' : '#2A2A2A'}
      />
    );
  }
  if (type === 'cancel') {
    return (
      <CloseIcon
        height={height ?? 18}
        width={width ?? 18}
        fill={isDisabled ? '#CFCFCF' : '#2A2A2A'}
      />
    );
  }
};
