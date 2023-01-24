import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
import { memo } from 'react';
const SvgTrash = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G clipPath="url(#trash_svg__a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.75 3.732v.189a40.695 40.695 0 0 1 3.232.427.625.625 0 0 1-.214 1.231l-.174-.03-.838 10.893a2.5 2.5 0 0 1-2.492 2.308H6.736a2.5 2.5 0 0 1-2.492-2.308L3.406 5.55l-.174.03a.625.625 0 1 1-.214-1.232A40.488 40.488 0 0 1 6.25 3.92v-.19c0-1.303 1.01-2.416 2.346-2.459a43.908 43.908 0 0 1 2.808 0c1.336.043 2.346 1.156 2.346 2.46Zm-5.114-1.21a42.671 42.671 0 0 1 2.728 0c.629.02 1.136.548 1.136 1.21v.094a41.24 41.24 0 0 0-5 0v-.094c0-.662.507-1.19 1.136-1.21Zm-.295 4.954a.625.625 0 1 0-1.25.048l.289 7.5a.625.625 0 0 0 1.25-.048l-.29-7.5Zm4.567.048a.625.625 0 1 0-1.25-.048l-.288 7.5a.625.625 0 1 0 1.25.048l.288-7.5Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="trash_svg__a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const Memo = memo(SvgTrash);
export default Memo;
