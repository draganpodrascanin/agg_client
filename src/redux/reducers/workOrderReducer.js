import { GET_WORK_ORDER, CLEAR_WORK_ORDER } from '../actions/action-types';

const initialState = {};

export const workOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_WORK_ORDER:
			return { ...action.payload };
		case CLEAR_WORK_ORDER:
			return {};
		default:
			return state;
	}
};
