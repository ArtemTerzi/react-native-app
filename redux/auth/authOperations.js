import firebase from '../../firebase/config';

import { authSlice } from './authReducer';

export const authSignUp =
  ({ login, password, email }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase.auth().currentUser.updateProfile({
        displayName: login,
      });

      const { uid, displayName } = await firebase.auth().currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (e) {
      console.log('error.code', e.code);
      console.log('error.message', e.message);
    }
  };

export const authSignIn =
  ({ password, email }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('error.code', e.code);
      console.log('error.message', e.message);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  await firebase.auth().signOut();

  dispatch(authSlice.actions.authSignOut());
};

export const authStateChanged = () => async (dispatch, getState) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
