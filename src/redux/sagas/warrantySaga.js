import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	GET_WARRANTIES_SAGA,
	LOADING,
	CLEAR_LOADING,
	GET_WARRANTIES,
	UI_ERROR,
	CREATE_WARRANTY_SAGA,
	CREATE_WARRANTY,
	SUCCESS,
	EDIT_WARRANTY_SAGA,
	EDIT_WARRANTY,
	DELETE_WARRANTY_SAGA,
	DELETE_WARRANTY,
} from '../actions/action-types';

function* getWarrantiesSaga(action) {
	yield put({ type: LOADING });

	let url = `/api/v1/warranties/forCar/${action.payload.carId}`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_LOADING });
		yield put({ type: GET_WARRANTIES, payload: response.data.data });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju garancija.',
		});
	}
}

export function* watchGetWarrantiesSaga() {
	yield takeLatest(GET_WARRANTIES_SAGA, getWarrantiesSaga);
}

function* createWarrantySaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/warranties', {
				carId: action.payload.carId,
				warrantyConditionsTitle: action.payload.warrantyConditionsTitle,
				partsUnderWarranty: action.payload.partsUnderWarranty,
				validUntil: action.payload.validUntil,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_WARRANTY, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno registrovana garancija.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju garancije. ',
		});
	}
}

export function* watchCreateWarrantiesSaga() {
	yield takeLatest(CREATE_WARRANTY_SAGA, createWarrantySaga);
}

function* editWarrantySaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/warranties/${action.payload.warrantyId}`, {
				partsUnderWarranty: action.payload.partsUnderWarranty,
				validUntil: action.payload.validUntil,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: EDIT_WARRANTY, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno izmenjena garancija.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri pokašaju izmena garancije. ',
		});
	}
}

export function* watchEditWarrantySaga() {
	yield takeLatest(EDIT_WARRANTY_SAGA, editWarrantySaga);
}

function* deleteWarrantySaga(action) {
	yield put({ type: LOADING });

	try {
		yield call(() =>
			Axios.delete(`/api/v1/warranties/${action.payload.warrantyId}`)
		);

		yield put({
			type: DELETE_WARRANTY,
			payload: { id: action.payload.warrantyId },
		});

		yield put({ type: CLEAR_LOADING });
		yield put({ type: SUCCESS, payload: 'Upešno obrisana garancija.' });
	} catch (er) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri brisanju garancije.',
		});
	}
}

export function* watchDeleteWarrantySaga() {
	yield takeLatest(DELETE_WARRANTY_SAGA, deleteWarrantySaga);
}
