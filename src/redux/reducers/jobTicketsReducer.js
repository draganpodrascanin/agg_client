import { CREATE_JOB_TICKET, GET_JOB_TICKETS } from '../actions/action-types';

const initialState = [];

export const jobTicketsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_JOB_TICKETS:
			return [...action.payload];
		case CREATE_JOB_TICKET:
			return [action.payload, ...state];
		default:
			return state;
	}
};
