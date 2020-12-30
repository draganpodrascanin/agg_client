import Axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_CLIENTS_LOADING,
	CLEAR_LOADING,
	CLIENTS_ERROR,
	CLIENTS_LOADING,
	CREATE_CLIENT,
	CREATE_CLIENT_SAGA,
	GET_CLIENTS,
	GET_CLIENTS_SAGA,
	LOADING,
	SET_CLIENT_CAR_OWNERSHIP,
	SET_CLIENT_CAR_OWNERSHIP_SAGA,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* getClientsSaga(action) {
	const page = action.payload.page || 1;
	const limit = action.payload.limit || 12;
	const search = action.payload.search;
	let url = `/api/v1/users?page=${page}&limit=${limit}`;
	if (search) url += `&search=${search}`;
	yield put({ type: CLIENTS_LOADING });
	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_CLIENTS_LOADING });
		yield put({
			type: GET_CLIENTS,
			payload: {
				clients: response.data.data,
				count: response.data.countAllThatMatch,
			},
		});
	} catch (err) {
		yield put({ type: CLEAR_CLIENTS_LOADING });
		yield put({
			type: CLIENTS_ERROR,
			payload: 'Greska pri preuzimanju klijenata',
		});
	}
}

export function* watchGetClientsSaga() {
	yield takeLatest(GET_CLIENTS_SAGA, getClientsSaga);
}

function* createClientSaga(action) {
	yield put({ type: LOADING });
	try {
		const response = yield call(() =>
			Axios.post('/api/v1/users/', action.payload)
		);
		yield put({ type: CREATE_CLIENT, payload: response.data.data });
		yield put({ type: SUCCESS, payload: 'Uspešno kreiran novi klijent' });
		yield put({ type: CLEAR_LOADING });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'greška pri kreiranju novog klijenta',
		});
	}
}

export function* watchCreateClientSaga() {
	yield takeLatest(CREATE_CLIENT_SAGA, createClientSaga);
}

function* setClientCarOwnershipSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.patch('/api/v1/cars/setOwnerByReg', {
				carReg: action.payload.carReg,
				userId: action.payload.clientId,
			})
		);

		yield put({ type: SET_CLIENT_CAR_OWNERSHIP, payload: response.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: SUCCESS,
			payload: 'uspesno stavljeno vlasnistvo automobila',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'greska pri postavljanju vlasnistva',
		});
	}
}

export function* watchSetClientCarOwnershipSaga() {
	yield takeEvery(SET_CLIENT_CAR_OWNERSHIP_SAGA, setClientCarOwnershipSaga);
}
