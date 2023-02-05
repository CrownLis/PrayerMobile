import * as React from 'react';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgNonetwork = (props: SvgProps) => (
  <Svg width={177} height={177} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#nonetwork_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89 178c49.706 0 90-40.294 90-90S138.706-2 89-2C66.7-2 58.223 24.748 42.5 38.18 23.178 54.688-1 60.595-1 88c0 49.706 40.294 90 90 90Z"
        fill="#F2F2F2"
      />
      <G filter="url(#nonetwork_svg__b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M90.5 163c34.794 0 63-28.206 63-63s-28.206-63-63-63c-15.61 0-21.544 18.723-32.55 28.126C44.425 76.681 27.5 80.816 27.5 100c0 34.794 28.206 63 63 63Z"
          fill="#EBEBEB"
        />
      </G>
      <Path
        d="M90.5 145c28.995 0 52.5-23.505 52.5-52.5S119.495 40 90.5 40 38 63.505 38 92.5 61.505 145 90.5 145Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.607 81.303a4.5 4.5 0 0 1-4.5 4.5H63.5a4.5 4.5 0 0 1 0-9h13.607a4.5 4.5 0 0 1 4.5 4.5ZM120.607 81.303a4.5 4.5 0 0 1-4.5 4.5H102.5a4.5 4.5 0 0 1 0-9h13.607a4.5 4.5 0 0 1 4.5 4.5ZM103.945 112.293a4.5 4.5 0 0 1-6.238 1.259l-7.966-5.29-7.814 5.272a4.5 4.5 0 0 1-5.033-7.461l10.311-6.956a4.5 4.5 0 0 1 5.006-.018l10.475 6.956a4.5 4.5 0 0 1 1.259 6.238Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="nonetwork_svg__a">
        <Path fill="#fff" d="M0 0h177v177H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgNonetwork);
export default Memo;
