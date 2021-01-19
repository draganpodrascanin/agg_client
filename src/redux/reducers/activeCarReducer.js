import {
	CREATE_WARRANTY,
	DELETE_WARRANTY,
	EDIT_WARRANTY,
	GET_ACTIVE_CAR,
} from '../actions/action-types';

const initialState = {};

export const activeCarReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACTIVE_CAR:
			return action.payload;
		case CREATE_WARRANTY:
			return { ...state, warranties: [action.payload, ...state.warranties] };

		case EDIT_WARRANTY:
			const newWarranties = state.warranties.map((warranty) => {
				if (warranty.id === action.payload.id) return action.payload;
				else return warranty;
			});
			return { ...state, warranties: newWarranties };

		case DELETE_WARRANTY:
			const filteredWarranties = state.warranties.filter((warranty) => {
				return warranty.id !== action.payload.id;
			});

			return { ...state, warranties: filteredWarranties };

		default:
			return state;
	}
};
