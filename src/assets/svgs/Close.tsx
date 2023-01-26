import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
import { memo } from 'react';
const SvgClose = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#close_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.102 4.102c.22-.22.576-.22.796 0L9 8.204l4.102-4.102a.562.562 0 1 1 .796.796L9.796 9l4.102 4.102a.562.562 0 1 1-.796.796L9 9.796l-4.102 4.102a.562.562 0 1 1-.796-.796L8.204 9 4.102 4.898a.563.563 0 0 1 0-.796Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="close_svg__a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgClose);
export default Memo;
