import { EDIT_BLOG, GET_ACTIVE_BLOG } from '../actions/action-types';

const initialState = null;

export const activeBlogReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACTIVE_BLOG:
			return action.payload;
		case EDIT_BLOG:
			return action.payload;
		default:
			return state;
	}
};
