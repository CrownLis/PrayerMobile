import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgBack = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#back_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.273 2.977c.22.22.22.576 0 .796L3.608 8.437H15.75a.562.562 0 1 1 0 1.126H3.608l4.665 4.664a.562.562 0 1 1-.796.796L1.852 9.398a.563.563 0 0 1 0-.796l5.625-5.625c.22-.22.576-.22.796 0Z"
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="back_svg__a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgBack);
export default Memo;
