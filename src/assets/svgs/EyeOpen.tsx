import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { memo } from 'react';
const SvgEyeOpen = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#eye-open_svg__a)">
      <G clipPath="url(#eye-open_svg__b)" fill={props.fill}>
        <Path d="M10.445 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.11 10.59a1.651 1.651 0 0 1 0-1.186A10.003 10.003 0 0 1 10.444 3c4.257 0 7.893 2.66 9.336 6.41.147.381.147.804 0 1.186A10.003 10.003 0 0 1 10.446 17c-4.257 0-7.893-2.66-9.336-6.41ZM14.446 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="eye-open_svg__a">
        <Rect width={20} height={20} rx={10} fill="#fff" />
      </ClipPath>
      <ClipPath id="eye-open_svg__b">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgEyeOpen);
export default Memo;
