import {
	GET_ADMINS_SAGA,
	CREATE_ADMIN_SAGA,
	UPDATE_ADMIN_SAGA,
	UPDATE_ADMIN_PASSWORD_SAGA,
	DELETE_ADMIN_SAGA,
} from './action-types';

export const getAdminsAction = () => ({
	type: GET_ADMINS_SAGA,
});

export const createAdminAction = (
	username,
	firstName,
	lastName,
	email,
	phoneNumber,
	password,
	passwordConfirm,
	role
) => ({
	type: CREATE_ADMIN_SAGA,
	payload: {
		username,
		firstName,
		lastName,
		email,
		phoneNumber,
		password,
		passwordConfirm,
		role,
	},
});

export const updateAdminAction = ({
	id,
	username,
	firstName,
	lastName,
	phoneNumber,
	email,
	role,
}) => ({
	type: UPDATE_ADMIN_SAGA,
	payload: { id, username, firstName, lastName, phoneNumber, email, role },
});

export const updateAdminPasswordAction = (id, password, passwordConfirm) => ({
	type: UPDATE_ADMIN_PASSWORD_SAGA,
	payload: { id, password, passwordConfirm },
});

export const deleteAdminAction = (id) => ({
	type: DELETE_ADMIN_SAGA,
	payload: { id },
});
