declare module '*.module.scss' {
  import { StyleProp } from 'react-native';
  const content: Record<string, StyleProp<any>>;
  export default content;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
