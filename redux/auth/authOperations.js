import firebase from '../../firebase/config';

import { authSlice } from './authReducer';

export const authSignUp =
  ({ login, password, email, avatar }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const user = await firebase.auth().currentUser;

      await user.updateProfile({
        photoURL: avatar,
        displayName: login,
      });

      const { photoURL, uid, displayName } = await firebase.auth().currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          avatar: photoURL,
          login: displayName,
          userId: uid,
          email,
        })
      );
    } catch (e) {
      console.log('error.message', e.message);
      throw e;
    }
  };

export const authSignIn =
  ({ password, email }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('error.message', e.message);
      throw e;
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  await firebase.auth().signOut();

  dispatch(authSlice.actions.authSignOut());
};

export const authStateChanged = () => async (dispatch, getState) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
