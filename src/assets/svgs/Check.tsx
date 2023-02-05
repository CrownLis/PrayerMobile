import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';
const SvgCheck = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#check_svg__a)">
      <G clipPath="url(#check_svg__b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.704 2.653a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          fill={props.fill}
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="check_svg__a">
        <Rect width={20} height={20} rx={10} fill="#fff" />
      </ClipPath>
      <ClipPath id="check_svg__b">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgCheck);
export default Memo;
