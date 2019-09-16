import React, { useState } from 'react'
import './Auth.css';
import "../../components/Form.css";
import '../../components/Button.css';
import ShadowCard from '../../components/ShadowCard';

import { firebaseApp } from '../../config/firebase';

export default function Register() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmedPassword, setConfirmedPassword] = useState('');

  const submitRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      alert("Passwords do not match. Please try again");
      return;
    }
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(res => {
      setEmail('');
      setPassword('');
      setConfirmedPassword('');
      alert("Register succeeded")
    }).catch(err => {
      if (err.code === "auth/email-already-in-use") {
        alert(err.message)
      }
    })
  }

  return (
    <div>
      <div className="Auth-container">
        <ShadowCard style={{ width: "60%", height: "auto" }}>
          <div>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <form className="login-form" action="" method="post">
              <div className="form-control-product">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} required />
              </div>
              <div className="form-control-product">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} required />
              </div>
              <div className="form-control-product">
                <label htmlFor="confirmedPassword">Confirm Password</label>
                <input type="password" name="confirmedPassword" id="confirmedPassword" value={confirmedPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setConfirmedPassword(e.target.value) }} required />
              </div>
              <button className="btn" type="submit" onClick={submitRegister}>Register</button>
            </form>
          </div>
        </ShadowCard>
      </div>
    </div>
  )
}
