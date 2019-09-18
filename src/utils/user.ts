import { firebaseApp, db } from '../config/firebase';

export const checkUserLogIn = (): firebase.User | null => {
  const user = firebaseApp.auth().currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const addToUsers = (user: firebase.User) => {
  const email = user.email;
  const uid = user.uid;
  const users = db.collection('users').doc(uid);
  users.set({
    email: email,
    id: uid,
    displayName: user.displayName
  });
};
