import {
	GET_CURRENT_ADMIN_FAIL,
	GET_CURRENT_ADMIN_SUCCESS,
	LOADING,
	LOGIN_ERROR,
	LOGIN_SUCCESS,
	LOGOUT,
} from '../actions/action-types';

const initialState = {
	isLoggedIn: false,
	firstName: '',
	lastName: '',
	username: '',
	role: '',
	errors: [],
	loading: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case LOGIN_SUCCESS:
			return {
				isLoggedIn: true,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				username: action.payload.username,
				role: action.payload.role,
				errors: [],
				loading: false,
			};
		case LOGIN_ERROR:
			return {
				...state,
				loading: false,
				errors: action.payload.errors,
			};
		case GET_CURRENT_ADMIN_SUCCESS:
			return {
				isLoggedIn: true,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				username: action.payload.username,
				role: action.payload.role,
				errors: [],
				loading: false,
			};
		case GET_CURRENT_ADMIN_FAIL:
			return initialState;
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
