import { CREATE_APPOINTMENT, GET_APPOINTMENTS } from '../actions/action-types';

const initialState = [];

export const appointentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.payload;
		case CREATE_APPOINTMENT:
			return [action.payload, ...state];
		default:
			return state;
	}
};
