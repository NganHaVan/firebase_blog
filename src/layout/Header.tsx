import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { useLoggedInUser } from '../hooks/userHooks';

export default function Header() {
  const renderUnauthList = () => {
    return (
      <ul className='Header-list'>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Signup</Link>
        </li>
      </ul>
    );
  };

  const renderAuthList = (user: firebase.User) => {
    return (
      <ul className='Header-list'>
        <li>Welcome, {user.displayName ? user.displayName : 'user'}</li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
    );
  };

  const loggedInUser = useLoggedInUser();

  return (
    <header className='Header-container'>
      <h1 className='Header-logo'>Book Blog</h1>
      {loggedInUser && localStorage.getItem('firebase_token')
        ? renderAuthList(loggedInUser)
        : renderUnauthList()}
    </header>
  );
}
