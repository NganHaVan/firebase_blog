import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonProps = {
  design?: string;
  mode?: string;
  onClick?: () => void;
  link?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const button = (props: ButtonProps) =>
  !props.link ? (
    <button
      className={[
        'button',
        `button--${props.design}`,
        `button--${props.mode}`
      ].join(' ')}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type || 'button'}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  ) : (
    <Link
      className={[
        'button',
        `button--${props.design}`,
        `button--${props.mode}`
      ].join(' ')}
      to={props.link}
    >
      {props.children}
    </Link>
  );

export default button;
