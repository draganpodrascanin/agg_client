import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	GET_JOBCONCLUSIONS,
	GET_JOBCONCLUSIONS_SAGA,
	JOB_CONCLUSIONS_ERROR,
} from '../actions/action-types';

function* jobConclusionSaga(action) {
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

export function* watchJobConclusionSaga() {
	yield takeLatest(GET_JOBCONCLUSIONS_SAGA, jobConclusionSaga);
}
