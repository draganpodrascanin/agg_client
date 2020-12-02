import Axios from 'axios';

const { put, call, takeEvery } = require('redux-saga/effects');
const {
	LOADING,
	LOGIN_SAGA,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	GET_CURRENT_ADMIN_FAIL,
	GET_CURRENT_ADMIN_SAGA,
	GET_CURRENT_ADMIN_SUCCESS,
	LOGOUT_SAGA,
	LOGOUT,
	CLEAR_LOADING,
} = require('../actions/action-types');

//--------LOGIN--------------
function* loginSaga(action) {
	yield put({ type: LOADING });
	try {
		const admin = yield call(() =>
			Axios.post('/api/v1/admin/login', {
				username: action.payload.username,
				password: action.payload.password,
			})
		);
		const { firstName, lastName, username, role } = admin.data.data.user;

		yield put({
			type: LOGIN_SUCCESS,
			payload: { firstName, lastName, username, role },
		});
	} catch (err) {
		// console.dir(err);
		const errors = err.response.data;
		yield put({ type: LOGIN_ERROR, payload: [errors] });
	}
}

export function* watchLoginSaga() {
	yield takeEvery(LOGIN_SAGA, loginSaga);
}

//-----GET CURRENT ADMIN ---------

function* getCurrentAdminSaga() {
	yield put({ type: LOADING });
	try {
		const currentAdmin = yield call(() =>
			Axios.get('/api/v1/admin/getCurrentAdmin')
		);

		const { username, firstName, lastName, role } = currentAdmin.data.data;

		yield put({
			type: GET_CURRENT_ADMIN_SUCCESS,
			payload: { username, firstName, lastName, role },
		});
		yield put({ type: CLEAR_LOADING });
	} catch (e) {
		yield put({ type: CLEAR_LOADING });
		yield put({ type: GET_CURRENT_ADMIN_FAIL });
	}
}

export function* watchGetCurrentAdminSaga() {
	yield takeEvery(GET_CURRENT_ADMIN_SAGA, getCurrentAdminSaga);
}

//-------- LOGOUT -------

function* logoutSaga() {
	yield put({ type: LOADING });
	yield call(() => Axios.post('/api/v1/admin/logout'));
	yield put({ type: CLEAR_LOADING });
	yield put({ type: LOGOUT });
}

export function* watchLogoutSaga() {
	yield takeEvery(LOGOUT_SAGA, logoutSaga);
}
