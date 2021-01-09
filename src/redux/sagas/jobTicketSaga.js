import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_JOB_TICKET,
	CREATE_JOB_TICKET_SAGA,
	EDIT_JOB_TICKET,
	EDIT_JOB_TICKET_SAGA,
	GET_JOB_TICKETS,
	GET_JOB_TICKETS_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createJobTicketSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/jobTickets', {
				workOrderId: action.payload.workOrderId,
				ticket: action.payload.ticket,
				status: action.payload.status,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_JOB_TICKET, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno napravljen radni nalog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju radnog naloga. ',
		});
	}
}

export function* watchCreateJobTicketSaga() {
	yield takeLatest(CREATE_JOB_TICKET_SAGA, createJobTicketSaga);
}

function* editJobTicketSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/jobTickets/${action.payload.jobTicketId}`, {
				status: action.payload.status,
				ticket: action.payload.ticket,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: EDIT_JOB_TICKET, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno izmenjen radni nalog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri pokašaju izmena radnog naloga. ',
		});
	}
}

export function* watchEditJobTicketSaga() {
	yield takeLatest(EDIT_JOB_TICKET_SAGA, editJobTicketSaga);
}

function* getJobTicketsSaga() {
	yield put({ type: LOADING });

	let url = `/api/v1/jobTickets`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_LOADING });
		yield put({ type: GET_JOB_TICKETS, payload: response.data.data });
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju zakazanih termina.',
		});
	}
}

export function* watchGetJobTicketSaga() {
	yield takeLatest(GET_JOB_TICKETS_SAGA, getJobTicketsSaga);
}
