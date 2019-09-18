import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import './Modal.css';

const modal = (props: {
  title: React.ReactNode;
  children: React.ReactNode;
  onCancelModal: (() => void) | undefined;
  onAcceptModal: (() => void) | undefined;
  acceptEnabled: boolean;
}) =>
  ReactDOM.createPortal(
    <div className='modal'>
      <header className='modal__header'>
        <h1>{props.title}</h1>
      </header>
      <div className='modal__content'>{props.children}</div>
      <div className='modal__actions'>
        <Button design='danger' mode='flat' onClick={props.onCancelModal}>
          Cancel
        </Button>
        <Button
          mode='raised'
          onClick={props.onAcceptModal}
          disabled={!props.acceptEnabled}
        >
          Accept
        </Button>
      </div>
    </div>,
    // @ts-ignore
    document.getElementById('modal-root')
  );

export default modal;
