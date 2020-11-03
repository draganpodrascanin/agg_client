import { all } from 'redux-saga/effects';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';

function* rootSaga() {
	yield all([watchLoginSaga(), watchGetCurrentAdminSaga(), watchLogoutSaga()]);
}

export default rootSaga;
