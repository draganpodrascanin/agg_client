import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	GET_EXPENSES,
	GET_EXPENSES_SAGA,
	GET_EXPENSES_FAILED,
	CREATE_EXPENSE_SAGA,
	CREATE_EXPENSE,
	UPDATE_EXPENSE,
	UPDATE_EXPENSE_SAGA,
	DELETE_EXPENSE_SAGA,
	DELETE_EXPENSE,
	EXPENSE_ERROR,
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

export function* createExpenseSaga(action) {
	try {
		yield call(() => {
			Axios.post('/api/v1/expenses', {
				description: action.payload.description,
				date: action.payload.date,
				amount: action.payload.amount,
			});
		});
		yield put({ type: CREATE_EXPENSE });
	} catch (err) {
		yield put({
			type: EXPENSE_ERROR,
			payload: 'greška pri kreiranju novog troška',
		});
	}
}

export function* watchCreateExpenseSaga() {
	yield takeEvery(CREATE_EXPENSE_SAGA, createExpenseSaga);
}

function* updateExpenseSaga(action) {
	const { description, date, amount, id } = action.payload;
	try {
		const res = yield call(() =>
			Axios.patch(`/api/v1/expenses/${id}`, { description, date, amount })
		);
		yield put({ type: UPDATE_EXPENSE, payload: { ...res.data.data } });
	} catch (err) {
		yield put({
			type: EXPENSE_ERROR,
			payload: 'greška pri pokušaju izmena na troškovima',
		});
	}
}

export function* watchUpdateExpenseSaga() {
	yield takeLatest(UPDATE_EXPENSE_SAGA, updateExpenseSaga);
}

function* deleteExpenseSaga(action) {
	try {
		yield call(() => Axios.delete(`/api/v1/expenses/${action.payload.id}`));
		yield put({ type: DELETE_EXPENSE, payload: { id: action.payload.id } });
	} catch (err) {
		yield put({
			type: EXPENSE_ERROR,
			payload: 'greška pri brisanju troška',
		});
	}
}

export function* watchDeleteExpenseSaga() {
	yield takeLatest(DELETE_EXPENSE_SAGA, deleteExpenseSaga);
}
