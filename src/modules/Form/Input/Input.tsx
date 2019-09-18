import React from 'react';

import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  control: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rows?: number;
}

const input = (props: InputProps) => (
  <div className='input'>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === 'input' && (
      <input
        className='valid touched'
        type={props.type}
        required
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    )}
    {props.control === 'textarea' && (
      <textarea
        className='valid touched'
        rows={props.rows || 5}
        required
        value={props.value}
        onChange={props.onChange}
      />
    )}
  </div>
);

export default input;
