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
			console.log('REDUCER POGODJEN');
			const filteredWarranties = state.warranties.filter((warranty) => {
				console.log('payload', action.payload);
				console.log('payload.id', action.payload.id);
				console.log('warranty.id', warranty.id);
				console.log('warranty', warranty);
				return warranty.id !== action.payload.id;
			});

			return { ...state, warranties: filteredWarranties };

		default:
			return state;
	}
};
