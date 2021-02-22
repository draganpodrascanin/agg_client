import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { roleTranslate } from '../../components/util/roleTranslate';
import {
	CLEAR_LOADING,
	CREATE_ADMIN,
	CREATE_ADMIN_SAGA,
	DELETE_ADMIN,
	DELETE_ADMIN_SAGA,
	GET_ADMINS,
	GET_ADMINS_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
	UPDATE_ADMIN,
	UPDATE_ADMIN_PASSWORD,
	UPDATE_ADMIN_PASSWORD_SAGA,
	UPDATE_ADMIN_SAGA,
} from '../actions/action-types';

function* getAdminsSaga(action) {
	let url = `/api/v1/admin?`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: GET_ADMINS, payload: response.data.data });
	} catch (err) {
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju administratora.. Pokušajte kasnije.',
		});
	}
}

export function* watchGetAdminsSaga() {
	yield takeLatest(GET_ADMINS_SAGA, getAdminsSaga);
}

function* createAdminSaga(action) {
	yield put({ type: LOADING });
	const { payload } = action;

	try {
		const res = yield call(() =>
			Axios.post('/api/v1/admin/createAdmin', payload)
		);

		yield put({ type: CREATE_ADMIN, payload: res.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: SUCCESS,
			payload: `Uspešno napravljen novi ${roleTranslate(res.data.data.role)}`,
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Došlo je do greške pri kreiranju novog Administratora',
		});
	}
}

export function* watchCreateAdminSaga() {
	yield takeLatest(CREATE_ADMIN_SAGA, createAdminSaga);
}

function* updateAdminSaga(action) {
	yield put({ type: LOADING });
	const { payload } = action;
	try {
		const res = yield call(() =>
			Axios.patch(`/api/v1/admin/${payload.id}`, payload)
		);
		yield put({ type: UPDATE_ADMIN, payload: res.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: SUCCESS,
			payload: `Uspešno napravljene izmena na Administratoru`,
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Došlo je do greške pri izmenama na Administratoru',
		});
	}
}

export function* watchUpdateAdminSaga() {
	yield takeLatest(UPDATE_ADMIN_SAGA, updateAdminSaga);
}

function* updateAdminPasswordSaga(action) {
	yield put({ type: LOADING });
	const { id, password, passwordConfirm } = action.payload;

	try {
		const res = yield call(() =>
			Axios.patch(`/api/v1/admin/${id}/updatePassword`, {
				password,
				passwordConfirm,
			})
		);

		yield put({ type: UPDATE_ADMIN_PASSWORD, payload: res.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: SUCCESS,
			payload: `Uspešno izmenjena šifra.`,
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Došlo je do greške pri promeni šifre.',
		});
	}
}

export function* watchUpdateAdminPasswordSaga() {
	yield takeLatest(UPDATE_ADMIN_PASSWORD_SAGA, updateAdminPasswordSaga);
}

function* deleteAdminSaga(action) {
	yield put({ type: LOADING });
	const { id } = action.payload;

	try {
		yield call(() => Axios.delete(`/api/v1/admin/${id}`));

		yield put({ type: DELETE_ADMIN, payload: { id } });
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: SUCCESS,
			payload: `Uspešno obrisan Administrator.`,
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Došlo je do greške pri brisanju Administratora.',
		});
	}
}

export function* watchDeleteAdminSaga() {
	yield takeLatest(DELETE_ADMIN_SAGA, deleteAdminSaga);
}
