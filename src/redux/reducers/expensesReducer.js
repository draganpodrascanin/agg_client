const { GET_EXPENSES } = require('../actions/action-types');

const initialState = [{ id: '', createdAt: '', description: '', amount: null }];

const expensesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EXPENSES:
			return [...action.payload];
		default:
			return state;
	}
};

export default expensesReducer;
