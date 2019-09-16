import React from 'react';
import './Header.css'

export default function Header() {
  return (
    <header className="Header-container">
      <h1 className="Header-logo">Book Blog</h1>
      <ul className="Header-list">
        <li><a href="#">Login</a></li>
        <li><a href="#">Signup</a></li>
      </ul>
    </header>
  )
}
