import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';
const SvgCheckSubscribe = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#check-subscribe_svg__a)">
      <G clipPath="url(#check-subscribe_svg__b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.964 3.123a.6.6 0 0 1 .113.84l-6.4 8.4a.6.6 0 0 1-.901.061l-3.6-3.6a.6.6 0 1 1 .848-.848L7.14 11.09l5.984-7.854a.6.6 0 0 1 .84-.113Z"
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="check-subscribe_svg__a">
        <Rect width={16} height={16} rx={8} fill="#fff" />
      </ClipPath>
      <ClipPath id="check-subscribe_svg__b">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgCheckSubscribe);
export default Memo;
