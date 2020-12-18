import {
	CAR_SUGGESTION_CLOSE,
	CAR_SUGGESTION_ERROR,
	CAR_SUGGESTION_LOADING,
	CAR_SUGGESTION_OPEN,
	// CLEAR_CAR_SUGGESTIONS,
	CLEAR_CAR_SUGGESTION_ERROR,
	CLEAR_CAR_SUGGESTION_LOADING,
	GET_CAR_SUGGESTIONS,
} from '../actions/action-types';

const initialState = {
	cars: [],
	loading: false,
	error: null,
	open: false,
};

export const carSuggestionReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CAR_SUGGESTIONS:
			return { ...state, cars: action.payload };
		case CAR_SUGGESTION_OPEN:
			return { ...state, open: true };
		case CAR_SUGGESTION_CLOSE:
			return { cars: [], loading: false, error: null, open: false };
		case CAR_SUGGESTION_LOADING:
			return { ...state, loading: true };
		case CLEAR_CAR_SUGGESTION_LOADING:
			return { ...state, loading: false };
		case CAR_SUGGESTION_ERROR:
			return { ...initialState, error: action.payload };
		case CLEAR_CAR_SUGGESTION_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};
