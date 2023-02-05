import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgEyeClosed = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#eye-closed_svg__a)">
      <G clipPath="url(#eye-closed_svg__b)" fill={props.fill}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
        />
        <Path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="eye-closed_svg__a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
      <ClipPath id="eye-closed_svg__b">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgEyeClosed);
export default Memo;
