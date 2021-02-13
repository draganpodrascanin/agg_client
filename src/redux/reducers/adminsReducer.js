import {
	CREATE_ADMIN,
	DELETE_ADMIN,
	GET_ADMINS,
	UPDATE_ADMIN,
} from '../actions/action-types';

export const adminsReducer = (state = [], action) => {
	switch (action.type) {
		case GET_ADMINS:
			return action.payload;
		case CREATE_ADMIN:
			return [action.payload, ...state];
		case UPDATE_ADMIN:
			const newAdmins = state.map((admin) => {
				if (admin.id === action.payload.id) return action.payload;
				return admin;
			});
			return newAdmins;
		case DELETE_ADMIN:
			const filteredAdmins = state.filter(
				(admin) => admin.id !== action.payload.id
			);
			return filteredAdmins;
		default:
			return state;
	}
};
