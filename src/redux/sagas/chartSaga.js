import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	GET_CHART_DATA_FAILED,
	GET_CHART_DATA_SAGA,
	GET_CHART_DATA_SUCCESS,
} from '../actions/action-types';

function* getChartDataSaga(action) {
	let queryStr = '';
	if (action.payload.queryFromDate && action.payload.queryToDate)
		queryStr += `?fromDate=${action.payload.queryFromDate}&toDate=${action.payload.queryToDate}`;

	try {
		const res = yield call(() =>
			Axios.get(`/api/v1/aggregations/expensesAndProfit${queryStr}`)
		);
		yield put({ type: GET_CHART_DATA_SUCCESS, payload: res.data.data });
	} catch (e) {
		yield put({ type: GET_CHART_DATA_FAILED });
	}
}

export function* watchGetChartDataSaga() {
	yield takeLatest(GET_CHART_DATA_SAGA, getChartDataSaga);
}

//---------------------------------------------------------------------------
