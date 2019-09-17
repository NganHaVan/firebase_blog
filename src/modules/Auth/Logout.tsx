import { firebaseApp } from '../../config/firebase';

import { history } from '../../App';

export default function Logout() {
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      localStorage.removeItem('firebase_token');
      history.push('/login');
    })
    .catch(err => console.log({ err }));
  return null;
}
