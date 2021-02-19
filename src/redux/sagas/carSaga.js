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
	GET_CARS_SAGA,
	SET_CARS_LOADING,
	CLEAR_CARS_LOADING,
	GET_CARS,
	GET_ACTIVE_CAR,
	GET_ACTIVE_CAR_SAGA,
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

function* getCarSaga(action) {
	yield put({ type: SET_CARS_LOADING });
	let url = '/api/v1/cars?';

	if (action.payload.search) url += `search=${action.payload.search}&`;
	if (action.payload.page) url += `page=${action.payload.page}&`;
	if (action.payload.limit) url += `limit=${action.payload.limit}&`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_CARS_LOADING });
		yield put({
			type: GET_CARS,
			payload: { count: response.data.count, cars: response.data.data },
		});
	} catch (err) {
		yield put({ type: CLEAR_CARS_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greska pri preuzimanju automobila sa servera.',
		});
	}
}

export function* watchGetCarsSaga() {
	yield takeLatest(GET_CARS_SAGA, getCarSaga);
}

function* getActiveCarSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.get(`/api/v1/cars/${action.payload.id}`)
		);

		yield put({ type: GET_ACTIVE_CAR, payload: response.data.data });
		yield put({ type: CLEAR_LOADING });
	} catch (er) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri automobila sa servera.',
		});
	}
}

export function* watchGetActiveCarSaga() {
	yield takeLatest(GET_ACTIVE_CAR_SAGA, getActiveCarSaga);
}
