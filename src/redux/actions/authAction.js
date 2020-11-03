import {
	GET_CURRENT_ADMIN_SAGA,
	LOGIN_SAGA,
	LOGOUT_SAGA,
} from './action-types';

export const loginAction = (username, password) => {
	return { type: LOGIN_SAGA, payload: { username, password } };
};

export const getCurrentAdminAction = () => {
	return { type: GET_CURRENT_ADMIN_SAGA };
};

export const logoutAdminAction = () => {
	return { type: LOGOUT_SAGA };
};
