declare module '*.module.scss' {
  const content: {
    button_wrapper_press: Record<string, any>;
    navigation: StyleProp<ViewStyle>;
    button_wrapper: StyleProp<ViewStyle>;
    button_text: StyleProp<TextStyle>;
    [className: any]: any;
  };
  export = content;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
