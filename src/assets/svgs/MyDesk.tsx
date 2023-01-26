import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgMyDesk = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M8.13 2.044c-1.114.189-1.959.929-2.378 2.083l-.092.253-.011 7.259c-.01 7.141-.009 7.264.07 7.58.044.176.156.474.249.661.137.276.241.412.551.721.429.43.801.648 1.381.809.319.089.33.089 3.72.089 3.841.001 3.637.016 4.32-.318.786-.385 1.344-1.061 1.591-1.93l.089-.311.012-6.94c.008-4.677-.002-7.06-.03-7.307-.142-1.238-.959-2.21-2.168-2.581l-.294-.09-3.4-.007c-1.87-.004-3.495.009-3.61.029"
      fill={props.fill}
      fillRule="evenodd"
    />
  </Svg>
);
const Memo = memo(SvgMyDesk);
export default Memo;
