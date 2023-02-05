import * as React from 'react';
import { memo } from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';
const SvgLoadingLargeWhite = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle opacity={0.5} cx={12} cy={12} r={9} stroke={props.stroke} strokeWidth={2.273} />
    <Path d="M12 21a9 9 0 0 1-9-9" stroke={1} strokeWidth={2.273} />
  </Svg>
);
const Memo = memo(SvgLoadingLargeWhite);
export default Memo;
