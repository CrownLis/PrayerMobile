import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgExit = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#exit_svg__a)">
      <Path
        d="M12.39 14.5V9.562H7.292a.563.563 0 1 1 0-1.125h5.098V3.391a1.971 1.971 0 0 0-1.969-1.97H5.97A1.97 1.97 0 0 0 4 3.392V14.5a1.97 1.97 0 0 0 1.969 1.969h4.452A1.971 1.971 0 0 0 12.39 14.5Zm3.142-4.938-1.852 1.852a.563.563 0 0 0 .795.796l2.813-2.813a.563.563 0 0 0 0-.795l-2.813-2.813a.562.562 0 0 0-.795.796l1.852 1.852H12.39v1.125h3.142Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="exit_svg__a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgExit);
export default Memo;
