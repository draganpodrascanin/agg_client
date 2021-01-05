import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_CAR_RECEPTION,
	CREATE_CAR_RECEPTION_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createCarReceptionSaga(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/carReceptions', {
				workOrderId: action.payload.workOrderId,
				ownerRemarks: action.payload.ownerRemarks,
				carDamage: action.payload.carDamage,
				milage: action.payload.milage,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_CAR_RECEPTION, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno odrađen prijem automobila.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju prijema automobila.',
		});
	}
}

export function* watchCreateCarReceptionSaga() {
	yield takeLatest(CREATE_CAR_RECEPTION_SAGA, createCarReceptionSaga);
}
