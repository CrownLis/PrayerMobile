import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
import { memo } from 'react';
const SvgProfile = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G
      clipPath="url(#profile_svg__a)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={props.fill}
    >
      <Path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.438.695 18.683 18.683 0 0 1-7.81 1.7c-2.787 0-5.434-.608-7.813-1.7a.75.75 0 0 1-.437-.695Z" />
    </G>
    <Defs>
      <ClipPath id="profile_svg__a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgProfile);
export default Memo;
