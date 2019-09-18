import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const backdrop = (props: {
  open?: boolean;
  onClick:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}) => {
  if (document.getElementById('backdrop-root') !== null) {
    return ReactDOM.createPortal(
      <div
        className={['backdrop', props.open ? 'open' : ''].join(' ')}
        onClick={props.onClick}
      />,
      // @ts-ignore
      document.getElementById('backdrop-root')
    );
  } else {
    return null;
  }
};

export default backdrop;
