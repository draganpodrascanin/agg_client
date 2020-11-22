import { GET_EXPENSES_SAGA } from './action-types';

export const getExpensesAction = (dateFrom, dateTo) => {
	return {
		type: GET_EXPENSES_SAGA,
		payload: {
			dateFrom,
			dateTo,
		},
	};
};
