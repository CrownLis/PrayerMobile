import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {mergeStyles} from '../../utils/mergeStyles';
import styles from './DeleteButton.module.scss';

type ButtonProps = {
  size: 'large' | 'medium';
};

const DeleteButton: FC<ButtonProps> = ({size}) => {
  return (
    <TouchableOpacity
      style={mergeStyles(
        {style: styles.button_wrapper, active: true},
        {style: styles[`button_wrapper_${size}`]},
      )}>
      <Svg style={styles.button_icon} width={20} height={20}>
        <Path
          fill="#fff"
          d="M13.75 3.732v.189a40.695 40.695 0 0 1 3.232.427.625.625 0 0 1-.214 1.231l-.174-.03-.838 10.893a2.5 2.5 0 0 1-2.492 2.308H6.736a2.5 2.5 0 0 1-2.492-2.308L3.406 5.55l-.174.03a.625.625 0 1 1-.214-1.232A40.488 40.488 0 0 1 6.25 3.92v-.19c0-1.303 1.01-2.416 2.346-2.459a43.908 43.908 0 0 1 2.808 0c1.336.043 2.346 1.156 2.346 2.46zm-5.114-1.21a42.671 42.671 0 0 1 2.728 0c.629.02 1.136.548 1.136 1.21v.094a41.24 41.24 0 0 0-5 0v-.094c0-.662.507-1.19 1.136-1.21zm-.295 4.954a.625.625 0 1 0-1.25.048l.289 7.5a.625.625 0 0 0 1.25-.048l-.29-7.5zm4.567.048a.625.625 0 1 0-1.25-.048l-.288 7.5a.625.625 0 1 0 1.25.048l.288-7.5z"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default DeleteButton;
