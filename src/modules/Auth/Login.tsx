import React, { useState } from 'react';
import './Auth.css';
import "../../components/Form.css";
import '../../components/Button.css';
import ShadowCard from '../../components/ShadowCard';

import { firebaseApp } from '../../config/firebase';

export default function Login() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const submitLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    firebaseApp.auth().signInWithEmailAndPassword(email, password).then(res => {

    }).catch(err => {
      console.log({ err });
      alert(err.message);
    })
  }

  return (
    <div className="Auth-container">
      <ShadowCard style={{ width: "60%", height: "auto" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <form className="login-form" action="" method="post">
            <div className="form-control-product">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} required />
            </div>
            <div className="form-control-product">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} required />
            </div>
            <button className="btn" type="submit" onClick={submitLogin}>Login</button>
          </form>
        </div>
      </ShadowCard>
    </div>
  )
}
