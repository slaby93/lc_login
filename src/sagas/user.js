
import { takeLatest, put, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  USERS_LOGIN_FAILURE,
  USERS_TOKEN_LOAD,
  USERS_TOKEN_SET,
  USERS_LOGOUT,
  USERS_TOKEN_REMOVE,
} from './../ducks/user';
import notificationManager from './../utils/notificationManager';
import localStorageManager from './../utils/localStorageManager';
import { TOKEN } from './../consts/localStorageKeys';

export function* login({ payload: { email, password, rememberMe } }) {
  try {
    const { token, success } = yield new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@test.pl' && password === 'Password1') {
          return resolve({
            token: 1234,
            success: true,
          });
        }
        resolve({
          success: false,
          token: null,
        });
      }, 1000);
    });
    if (!success) {
      yield put(USERS_LOGIN_FAILURE('Invalid credentials'));
      notificationManager.show({
        text: 'Invalid email or password', // here we should use i18
        layout: 'topRight',
        type: 'error',
      });

      return;
    }
    if (rememberMe) {
      localStorageManager.set(TOKEN, token);
    }
    notificationManager.show({
      text: 'Login successful',
      layout: 'topRight',
      type: 'success',
    });
    yield put(push('/dashboard'));
    yield put(USERS_LOGIN_SUCCESS({ token }));
  } catch (error) {
    yield put(USERS_LOGIN_FAILURE(error));
    notificationManager.show({
      text: 'Unable to connect to server',
      layout: 'topRight',
      type: 'error',
    });
  }
}

export function* logout() {
  localStorageManager.remove(TOKEN);
  yield put(USERS_TOKEN_REMOVE());
  yield put(push('/'));
}

export function* loadToken() {
  const token = localStorageManager.get(TOKEN);
  if (!token) {
    return;
  }
  yield put(USERS_TOKEN_SET({ token }));
}

export default function* watcher() {
  yield all([
    takeLatest(USERS_LOGIN_REQUEST, login),
    takeLatest(USERS_LOGOUT, logout),
    takeLatest(USERS_TOKEN_LOAD, loadToken),
  ]);
}
