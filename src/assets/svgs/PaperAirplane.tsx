import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgPaperAirplane = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#paper-airplane_svg__a)">
      <Path
        d="M4.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H14.5a.75.75 0 0 1 0 1.5H5.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 4.478 2.404Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="paper-airplane_svg__a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgPaperAirplane);
export default Memo;
