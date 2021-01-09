import { GET_ACTIVE_CAR } from '../actions/action-types';

const initialState = {};

export const activeCarReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACTIVE_CAR:
			return action.payload;
		default:
			return state;
	}
};
