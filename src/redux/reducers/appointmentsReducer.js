import {
	CREATE_APPOINTMENT,
	EDIT_APPOINTMENT,
	GET_APPOINTMENTS,
} from '../actions/action-types';

const initialState = [];

export const appointentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_APPOINTMENTS:
			return action.payload;
		case CREATE_APPOINTMENT:
			return [action.payload, ...state];
		case EDIT_APPOINTMENT:
			const newAppointments = state.map((ap) => {
				if (ap.id === action.payload.id) return action.payload;
				return ap;
			});
			return [...newAppointments];
		default:
			return state;
	}
};
