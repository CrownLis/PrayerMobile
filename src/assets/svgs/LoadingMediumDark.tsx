import * as React from 'react';
import { memo } from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';
const SvgLoadingMediumDark = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle opacity={0.5} cx={9} cy={9} r={6.75} stroke={props.stroke} strokeWidth={1.5} />
    <Path d="M9 15.75A6.75 6.75 0 0 1 2.25 9" stroke={props.stroke} strokeWidth={1.5} />
  </Svg>
);
const Memo = memo(SvgLoadingMediumDark);
export default Memo;
