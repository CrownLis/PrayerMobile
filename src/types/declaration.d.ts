declare module '*.module.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
