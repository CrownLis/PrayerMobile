import * as React from 'react';
import { memo } from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
const SvgUsersDesks = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#users-desks_svg__a)" fill={props.fill}>
      <Path d="M19.343 5.566c.102.378.157.774.157 1.184v10.5c0 .41-.055.806-.157 1.183A3 3 0 0 0 21 15.75v-7.5a3 3 0 0 0-1.657-2.684ZM12 2.25a3 3 0 0 1 3 3v13.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6ZM16.5 5.25c0-.41-.055-.806-.157-1.184A3 3 0 0 1 18 6.75v10.5a3 3 0 0 1-1.657 2.683c.102-.377.157-.774.157-1.183V5.25Z" />
    </G>
    <Defs>
      <ClipPath id="users-desks_svg__a">
        <Path fill="#fff" transform="rotate(90 12 12)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgUsersDesks);
export default Memo;
