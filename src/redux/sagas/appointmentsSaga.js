import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
	CLEAR_LOADING,
	CREATE_APPOINTMENT,
	CREATE_APPOINTMENT_SAGA,
	EDIT_APPOINTMENT,
	EDIT_APPOINTMENT_SAGA,
	GET_APPOINTMENTS,
	GET_APPOINTMENTS_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* getAppointmentsSaga(action) {
	yield put({ type: LOADING });

	const fromDate = dayjs(action.payload.fromDate).format('YYYY-MM-DD');
	const toDate = dayjs(action.payload.toDate).format('YYYY-MM-DD');

	const url = `/api/v1/appointments/betweenDates?fromDate=${fromDate}&toDate=${toDate}`;

	try {
		const response = yield call(() => Axios.get(url));
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

function* createAppointmentsSaga(action) {
	const { name, car, phoneNumber, note, datetime } = action.payload;
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/appointments', {
				name,
				car,
				phoneNumber,
				note,
				datetime,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_APPOINTMENT, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno zakazan terim.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri zakazivanju termina.',
		});
	}
}

export function* watchCreateAppointmentsSaga() {
	yield takeLatest(CREATE_APPOINTMENT_SAGA, createAppointmentsSaga);
}

function* editAppointmentsSaga(action) {
	const {
		appointmentId,
		showedUp,
		name,
		car,
		phoneNumber,
		note,
		datetime,
	} = action.payload;
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/appointments/${appointmentId}`, {
				showedUp,
				name,
				car,
				phoneNumber,
				note,
				datetime,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: EDIT_APPOINTMENT, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri izmeni termina.',
		});
	}
}

export function* watchEditAppointmentsSaga() {
	yield takeLatest(EDIT_APPOINTMENT_SAGA, editAppointmentsSaga);
}
