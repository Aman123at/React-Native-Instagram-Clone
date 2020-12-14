import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import {SET_USERPROFILE} from './action.types';

export const signUp = (data) => async (dispatch) => {
  console.log(data);

  const {name, email, username, password} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
      console.log('User Creation Successful');

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          username,

          uid: data.user.uid,
        })
        .then(() => console.log('Data set success'));

      Snackbar.show({
        text: 'account created',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: 'SignUp failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = (data) => async (dispatch) => {
  console.log(data);

  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('account signin success');
      Snackbar.show({
        text: 'account signin',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: 'Signin failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async (dispatch) => {
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'Signout success',
        textColor: 'white',
        backgroundColor: '#1b262c',
      });
    })
    .catch((error) => {
      console.error(error);
      Snackbar.show({
        text: 'Signout failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const getProfile = (profileImage) => async (dispatch) => {
  dispatch({
    type: SET_USERPROFILE,
    payload: profileImage,
  });
};