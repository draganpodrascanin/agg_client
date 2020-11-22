import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	GET_EXPENSES,
	GET_EXPENSES_SAGA,
	GET_EXPENSES_FAILED,
} from '../actions/action-types';

export function* getExpensesSaga(action) {
	const dateFrom = dayjs(action.payload.dateFrom).format('YYYY-MM-DD');
	const dateTo = dayjs(action.payload.dateTo).format('YYYY-MM-DD');
	const url = `/api/v1/expenses/betweenDates?dateFrom=${dateFrom}&dateTo=${dateTo}`;
	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: GET_EXPENSES, payload: response.data.data });
	} catch (err) {
		yield put({ type: GET_EXPENSES_FAILED });
	}
}

export function* watchGetExpensesSaga() {
	yield takeLatest(GET_EXPENSES_SAGA, getExpensesSaga);
}
