import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import { memo } from 'react';
const SvgSearch = (props: SvgProps) => (
  <Svg width={177} height={177} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#search_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M88.5 177c48.877 0 88.5-39.623 88.5-88.5S137.377 0 88.5 0C66.571 0 58.236 26.302 42.775 39.51 23.775 55.743 0 61.553 0 88.5 0 137.377 39.623 177 88.5 177Z"
        fill={props.fill}
      />
      <G filter="url(#search_svg__b)">
        <Path
          d="M135.7 59H59c-2.444 0-4.425 1.694-4.425 3.784v79.457c0 2.09 1.981 3.784 4.425 3.784h76.7c2.444 0 4.425-1.694 4.425-3.784V62.784c0-2.09-1.981-3.784-4.425-3.784Z"
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
        d="M124.875 129.606a3.688 3.688 0 0 0 .306-5.206l-11.8-13.275a3.688 3.688 0 0 0-5.512 4.9l11.8 13.275a3.688 3.688 0 0 0 5.206.306Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.35 80.388c-8.553 0-15.487 6.933-15.487 15.487 0 8.553 6.933 15.487 15.487 15.487s15.488-6.934 15.488-15.487c0-8.554-6.934-15.487-15.488-15.487ZM74.488 95.874c0-12.627 10.235-22.862 22.862-22.862 12.627 0 22.863 10.235 22.863 22.862 0 12.627-10.236 22.862-22.863 22.862-12.627 0-22.862-10.235-22.862-22.862Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="search_svg__a">
        <Path fill="#fff" d="M0 0h177v177H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgSearch);
export default Memo;
