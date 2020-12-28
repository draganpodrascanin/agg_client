import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_CAR,
	CREATE_CAR_SAGA,
	CREATE_CAR_AND_SET_OWNER_SAGA,
	LOADING,
	SET_CLIENT_CAR_OWNERSHIP,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createCarSaga({ payload }) {
	yield put({ type: LOADING });

	try {
		const car = yield call(() =>
			Axios.post('/api/v1/cars', {
				carBrand: payload.carBrand,
				carModel: payload.carModel,
				registration: payload.registration,
				engine: payload.engine,
				milage: payload.milage,
				productionYear: payload.productionYear,
			})
		);
		yield put({ type: CREATE_CAR, payload: car.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({ type: SUCCESS, payload: 'uspesno dodat automobil' });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'doslo je do greske pri kreiranju novog automobila',
		});
	}
}

export function* watchCreateCarSaga() {
	yield takeLatest(CREATE_CAR_SAGA, createCarSaga);
}

function* createCarAndSetOwner(action) {
	yield put({ type: LOADING });
	const { payload } = action;
	console.log('action', action);
	let car;
	try {
		car = yield call(() =>
			Axios.post('/api/v1/cars', {
				carBrand: payload.carBrand,
				carModel: payload.carModel,
				registration: payload.registration,
				engine: payload.engine,
				milage: payload.milage,
				productionYear: dayjs(payload.productionYear).format('YYYY-MM-DD'),
			})
		);

		console.log('CAR -> ', car);

		const res = yield call(() =>
			Axios.patch(`/api/v1/cars/${car.data.data.id}/setOwner`, {
				userId: payload.userId,
			})
		);
		yield put({ type: CREATE_CAR, payload: car.data.data });
		yield put({ type: SET_CLIENT_CAR_OWNERSHIP, payload: res.data.data });
		yield put({ type: CLEAR_LOADING });
		yield put({ type: SUCCESS, payload: 'uspesno dodat automobil' });
	} catch (err) {
		if (car?.data?.data?.id) {
			yield call(() => Axios.delete(`/api/v1/cars/${car.data.data.id}`));
		}
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'doslo je do greske pri kreiranju novog automobila',
		});
	}
}

export function* watchCreateCarAndSetOwnerSaga() {
	yield takeLatest(CREATE_CAR_AND_SET_OWNER_SAGA, createCarAndSetOwner);
}
