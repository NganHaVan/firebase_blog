import { useState, useEffect } from 'react';
import { firebaseApp } from '../config/firebase';
export const useLoggedInUser = () => {
  let [loggedInUser, setLoggedInUser]: [firebase.User | null, any] = useState(
    null
  );
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);
  return loggedInUser;
};
