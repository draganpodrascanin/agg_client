const dayjs = require('dayjs');
const {
	// GET_CHART_DATA,
	GET_CHART_DATA_SUCCESS,
	GET_CHART_DATA_FAILED,
	CHART_DATA_CLEAR_ERROR,
} = require('../actions/action-types');

const initialValues = {
	profit: [],
	expenses: [],
	profitAndExpenses: [],
	error: '',
};

export const chartDataReducer = (state = initialValues, action) => {
	switch (action.type) {
		case GET_CHART_DATA_SUCCESS:
			const profit = action.payload.profit.map((p) => {
				p.date = dayjs(p.date).format('DD-MM-YYYY');
				return p;
			});

			const expenses = action.payload.expenses.map((e) => {
				e.date = dayjs(e.date).format('DD-MM-YYYY');
				return e;
			});

			const profitAndExpenses = action.payload.profitAndExpenses.map((pe) => {
				pe.date = dayjs(pe.date).format('DD-MM-YYYY');
				return pe;
			});
			return { profit, expenses, profitAndExpenses };

		case GET_CHART_DATA_FAILED:
			return { ...state, error: 'greska pri uzimanju podataka za grafike' };
		case CHART_DATA_CLEAR_ERROR:
			return { ...state, error: '' };
		default:
			return state;
	}
};
