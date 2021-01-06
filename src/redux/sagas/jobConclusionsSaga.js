import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_JOB_CONCLUSION,
	CREATE_JOB_CONCLUSION_SAGA,
	EDIT_JOB_CONCLUSION_SAGA,
	GET_JOBCONCLUSIONS,
	GET_JOBCONCLUSIONS_SAGA,
	JOB_CONCLUSIONS_ERROR,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* getJobConclusionsSaga(action) {
	const url = `/api/v1/jobConclusion/betweenDates?dateFrom=${action.payload.fromDate}&dateTo=${action.payload.toDate}`;
	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: GET_JOBCONCLUSIONS, payload: response.data.data });
	} catch (err) {
		put({
			type: JOB_CONCLUSIONS_ERROR,
			payload: 'greska pri uzimanju odradjenih poslova',
		});
	}
}

export function* watchGetJobConclusionsSaga() {
	yield takeLatest(GET_JOBCONCLUSIONS_SAGA, getJobConclusionsSaga);
}

function* createJobConclusionSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/jobConclusion', {
				workOrderId: action.payload.workOrderId,
				workDone: action.payload.workDone,
				note: action.payload.note,
				charged: action.payload.charged,
			})
		);

		yield call(() =>
			Axios.patch(`/api/v1/workOrders/${action.payload.workOrderId}/complete`)
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_JOB_CONCLUSION, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno zaključen servisni nalog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri zaključenju servisnog naloga. ',
		});
	}
}

export function* watchCreateJobConclusionSaga() {
	yield takeLatest(CREATE_JOB_CONCLUSION_SAGA, createJobConclusionSaga);
}

function* editJobConclusionSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/jobConclusion/${action.payload.jobConclusionId}`, {
				workDone: action.payload.workDone,
				note: action.payload.note,
				charged: action.payload.charged,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_JOB_CONCLUSION, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno izmenjen servisni nalog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri pokušaju menjanja servisnog naloga.',
		});
	}
}

export function* watchEditJobConclusionSaga() {
	yield takeLatest(EDIT_JOB_CONCLUSION_SAGA, editJobConclusionSaga);
}
