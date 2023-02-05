import * as React from 'react';
import { memo } from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';
const SvgLoadingLargeDark = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle opacity={0.5} cx={11} cy={11} r={8.25} stroke={props.stroke} strokeWidth={2} />
    <Path d="M11 19.25A8.25 8.25 0 0 1 2.75 11" stroke={props.stroke} strokeWidth={2} />
  </Svg>
);
const Memo = memo(SvgLoadingLargeDark);
export default Memo;
