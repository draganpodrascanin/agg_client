import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CAR_SUGGESTION_ERROR,
	CAR_SUGGESTION_LOADING,
	CLEAR_CAR_SUGGESTION_LOADING,
	GET_CAR_SUGGESTIONS,
	GET_CAR_SUGGESTIONS_SAGA,
} from '../actions/action-types';

function* getCarSuggestionsSaga(action) {
	const url = `/api/v1/cars/suggestions?search=${action.payload}`;

	yield put({ type: CAR_SUGGESTION_LOADING });

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_CAR_SUGGESTION_LOADING });
		yield put({ type: GET_CAR_SUGGESTIONS, payload: response.data.data });
	} catch (err) {
		yield put({ type: CLEAR_CAR_SUGGESTION_LOADING });
		yield put({
			type: CAR_SUGGESTION_ERROR,
			payload: 'Greska pri pretrazi automobila sa tom registracijom',
		});
	}
}

export function* watchGetCarSuggestionSaga() {
	yield takeLatest(GET_CAR_SUGGESTIONS_SAGA, getCarSuggestionsSaga);
}
