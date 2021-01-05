import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_CAR_EXAM,
	CREATE_CAR_EXAM_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createCarExamSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/carExams', {
				workOrderId: action.payload.workOrderId,
				examConclusion: action.payload.examConclusion,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_CAR_EXAM, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno unesen rezultat pregleda automobila.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju pregleda automobila. ',
		});
	}
}

export function* watchCreateCarExamSaga() {
	yield takeLatest(CREATE_CAR_EXAM_SAGA, createCarExamSaga);
}
