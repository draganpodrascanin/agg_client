import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	GET_INVOICES,
	GET_INVOICES_SAGA,
	LOADING,
	UI_ERROR,
} from '../actions/action-types';

function* getInvoicesSaga(action) {
	yield put({ type: LOADING });
	let url = '/api/v1/invoices?';

	if (action.payload.page) url += `page=${action.payload.page}&`;
	if (action.payload.limit) url += `limit=${action.payload.limit}&`;
	if (action.payload.search) url += `search=${action.payload.search}&`;

	try {
		const response = yield call(() => Axios.get(url));

		yield put({ type: CLEAR_LOADING });
		yield put({
			type: GET_INVOICES,
			payload: { count: response.data.count, invoices: response.data.data },
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju računa sa servera.',
		});
	}
}

export function* watchGetInvoicesSaga() {
	yield takeLatest(GET_INVOICES_SAGA, getInvoicesSaga);
}
