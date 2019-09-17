import { firebaseApp } from '../config/firebase';

export const checkUserLogIn = (): firebase.User | null => {
  const user = firebaseApp.auth().currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};
