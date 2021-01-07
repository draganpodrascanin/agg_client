import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
	CLEAR_LOADING,
	GET_APPOINTMENTS,
	GET_APPOINTMENTS_SAGA,
	LOADING,
	UI_ERROR,
} from '../actions/action-types';

function* getAppointmentsSaga(action) {
	yield put({ type: LOADING });

	const fromDate = dayjs(action.payload.fromDate).format('YYYY-MM-DD');
	const toDate = dayjs(action.payload.toDate).format('YYYY-MM-DD');

	const url = `/api/v1/appointments/betweenDates?fromDate=${fromDate}&toDate=${toDate}`;

	try {
		const response = yield call(() => Axios.get(url));
		console.log('response = ', response);
		yield put({ type: CLEAR_LOADING });
		yield put({ type: GET_APPOINTMENTS, payload: response.data.data });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju zakazanih termina.',
		});
	}
}

export function* watchGetAppointmentsSaga() {
	yield takeLatest(GET_APPOINTMENTS_SAGA, getAppointmentsSaga);
}
