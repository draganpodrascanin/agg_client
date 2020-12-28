import { CREATE_CAR, GET_CARS } from '../actions/action-types';

const initialState = {
	cars: [],
	count: 1,
	error: '',
	loading: false,
};

const carsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CARS:
			return {
				...state,
				count: action.payload.count,
				cars: [...action.payload.cars],
			};
		case CREATE_CAR:
			return {
				...state,
				cars: [action.payload, ...state.cars],
				count: state.count + 1,
			};
		default:
			return state;
	}
};

export default carsReducer;
