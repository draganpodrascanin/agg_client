import { CHART_DATA_CLEAR_ERROR, GET_CHART_DATA_SAGA } from './action-types';

export const getChartDataAction = (fromDate, toDate) => {
	const queryFromDate = fromDate || null;
	const queryToDate = toDate || null;

	return { type: GET_CHART_DATA_SAGA, payload: { queryFromDate, queryToDate } };
};

export const chartDataClearErrorAction = () => {
	return { type: CHART_DATA_CLEAR_ERROR };
};
