import { GET_INVOICES } from '../actions/action-types';

const initialState = {
	invoices: [],
	count: 1,
};

export const invoicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INVOICES:
			return {
				invoices: [...action.payload.invoices],
				count: action.payload.count,
			};
		default:
			return state;
	}
};
