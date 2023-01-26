import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from 'react';
const SvgSketch = (props: SvgProps) => (
  <Svg width={177} height={177} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#sketch_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.5 177c48.877 0 88.5-39.623 88.5-88.5S137.377 0 88.5 0C66.571 0 58.236 26.302 42.775 39.51 23.775 55.743 0 61.553 0 88.5 0 137.377 39.623 177 88.5 177Z"
        fill={props.fill}
      />
      <G filter="url(#sketch_svg__b)">
        <Path
          d="M141.6 57.525H64.9c-2.444 0-4.425 1.694-4.425 3.784v79.457c0 2.09 1.981 3.784 4.425 3.784h76.7c2.444 0 4.425-1.694 4.425-3.784V61.309c0-2.09-1.981-3.784-4.425-3.784Z"
          fill={props.fill}
        />
      </G>
      <Path
        d="M51.625 59c0-6.517 5.283-11.8 11.8-11.8h56.05c6.517 0 11.8 5.283 11.8 11.8v63.425c0 6.517-5.283 11.8-11.8 11.8h-56.05c-6.517 0-11.8-5.283-11.8-11.8V59Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M138.334 64.631a4.425 4.425 0 0 1 .183 6.255l-37.948 40.23a4.425 4.425 0 1 1-6.438-6.073l37.948-40.23a4.425 4.425 0 0 1 6.255-.182Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="sketch_svg__a">
        <Path fill="#fff" d="M0 0h177v177H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgSketch);
export default Memo;
