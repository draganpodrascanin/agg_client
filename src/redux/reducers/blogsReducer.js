import { CREATE_BLOG } from '../actions/action-types';

const initialState = [];

export const blogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_BLOG:
			return [action.payload, ...state];
		default:
			return state;
	}
};
