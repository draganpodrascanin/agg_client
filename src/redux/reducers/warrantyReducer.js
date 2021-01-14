import {
	CREATE_WARRANTY,
	DELETE_WARRANTY,
	EDIT_WARRANTY,
	GET_WARRANTIES,
} from '../actions/action-types';

const initalState = [];

export const warrantyReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_WARRANTIES:
			return action.payload;
		case CREATE_WARRANTY:
			return [action.payload, ...state];
		case EDIT_WARRANTY:
			const newWarranties = state.map((warranty) => {
				if (warranty.id === action.payload.id) return action.payload;
				else return warranty;
			});
			return newWarranties;

		case DELETE_WARRANTY:
			const filteredWarranties = state.filter(
				(wanrranty) => wanrranty.id !== action.payload.id
			);
			return filteredWarranties;
		default:
			return state;
	}
};
