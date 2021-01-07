import { GET_APPOINTMENTS } from '../actions/action-types';

const initialState = [];

export const appointentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.payload;
		default:
			return state;
	}
};
