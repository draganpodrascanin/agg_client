import {
	CREATE_CLIENT_SAGA,
	GET_CLIENTS_SAGA,
	SET_CLIENT_CAR_OWNERSHIP_SAGA,
	UI_ERROR,
} from './action-types';

export const getClientsAction = (page, limit, search) => {
	if (!page) page = 1;
	if (!limit) limit = 12;

	return { type: GET_CLIENTS_SAGA, payload: { page, limit, search } };
};

export const createNewClientAction = (
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	passwordConfirm
) => {
	if (
		!firstName ||
		!lastName ||
		!phoneNumber ||
		!email ||
		!password ||
		!passwordConfirm
	)
		return { type: UI_ERROR, payload: 'sva polja su obavezna' };
	return {
		type: CREATE_CLIENT_SAGA,
		payload: {
			firstName,
			lastName,
			phoneNumber,
			email,
			password,
			passwordConfirm,
		},
	};
};

export const setClientCarOwnershipAction = (carReg, clientId) => {
	return {
		type: SET_CLIENT_CAR_OWNERSHIP_SAGA,
		payload: { carReg, clientId },
	};
};
