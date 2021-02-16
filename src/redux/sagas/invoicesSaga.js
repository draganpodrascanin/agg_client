import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_INVOICE,
	CREATE_INVOICE_SAGA,
	GET_INVOICES,
	GET_INVOICES_SAGA,
	LOADING,
	SUCCESS,
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

function* createInvoiceSaga(action) {
	yield put({ type: LOADING });
	const invoice = action.payload;

	try {
		const resInvoice = yield call(() =>
			Axios.post('/api/v1/invoices', invoice)
		);

		yield put({ type: CREATE_INVOICE, payload: resInvoice.data.data.invoice });

		yield put({ type: SUCCESS, payload: 'Uspešno napravljena faktura.' });
		yield put({ type: CLEAR_LOADING });
	} catch (err) {
		yield put({
			type: UI_ERROR,
			payload: 'Doslo je do greške pri kreiranju nove fakture.',
		});
		yield put({ type: CLEAR_LOADING });
	}
}

export function* watchCreateInvoiceSaga() {
	yield takeLatest(CREATE_INVOICE_SAGA, createInvoiceSaga);
}
