const {
	GET_EXPENSES,
	CREATE_EXPENSE,
	UPDATE_EXPENSE,
	DELETE_EXPENSE,
} = require('../actions/action-types');

const initialState = [{ id: '', createdAt: '', description: '', amount: null }];

const expensesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EXPENSES:
			return [...action.payload];
		case CREATE_EXPENSE:
			return initialState;
		case UPDATE_EXPENSE:
			const newState = state.map((exp) => {
				if (exp.id === action.payload.id) return action.payload;
				return exp;
			});
			return newState;
		case DELETE_EXPENSE:
			const filteredState = state.filter((obj) => obj.id !== action.payload.id);
			return [...filteredState];
		default:
			return state;
	}
};

export default expensesReducer;
