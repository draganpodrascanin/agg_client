import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CLEAR_WORK_ORDERS_LOADING,
	CREATE_WORK_ORDER,
	CREATE_WORK_ORDER_SAGA,
	GET_WORK_ORDERS,
	GET_WORK_ORDERS_SAGA,
	LOADING,
	SET_WORK_ORDERS_LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createWorkOrderSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(
			Axios.post('/api/v1/workOrders', {
				carRegistration: action.payload.carRegistration,
			})
		);
		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_WORK_ORDER, payload: response.data.data });
		yield put({ type: SUCCESS, payload: 'uspešno otvoren servisni nalog' });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju novog servisnog naloga.',
		});
	}
}

export function* watchCreateWorkOrderSaga() {
	yield takeLatest(CREATE_WORK_ORDER_SAGA, createWorkOrderSaga);
}

function* getWorkOrdersSaga(action) {
	yield put({ type: SET_WORK_ORDERS_LOADING });

	let url = '/api/v1/workOrders?';
	if (action.payload.page) url += `page=${action.payload.page}&`;
	if (action.payload.limit) url += `limit=${action.payload.limit}&`;
	if (action.payload.search) url += `search=${action.payload.search}&`;

	try {
		const response = yield call(() => Axios.get(url));

		console.log(response.data);

		yield put({ type: CLEAR_WORK_ORDERS_LOADING });
		yield put({ type: GET_WORK_ORDERS, payload: response.data.data });
	} catch (err) {
		yield put({ type: CLEAR_WORK_ORDERS_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greska pri ucitavanju servisnih naloga',
		});
	}
}

export function* watchGetWorkOrdersSaga() {
	yield takeLatest(GET_WORK_ORDERS_SAGA, getWorkOrdersSaga);
}
