import {
	CREATE_EXPENSE_SAGA,
	DELETE_EXPENSE_SAGA,
	GET_EXPENSES_SAGA,
	UPDATE_EXPENSE_SAGA,
} from './action-types';

export const getExpensesAction = (dateFrom, dateTo) => {
	return {
		type: GET_EXPENSES_SAGA,
		payload: {
			dateFrom,
			dateTo,
		},
	};
};

export const createExpenseAction = (description, amount, date) => {
	return { type: CREATE_EXPENSE_SAGA, payload: { description, amount, date } };
};

export const updateExpenseAction = (description, amount, date, id) => {
	return {
		type: UPDATE_EXPENSE_SAGA,
		payload: { description, amount, date, id },
	};
};

export const deleteExpenseAction = (id) => {
	return {
		type: DELETE_EXPENSE_SAGA,
		payload: { id },
	};
};
