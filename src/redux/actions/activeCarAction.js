import { GET_ACTIVE_CAR_SAGA } from './action-types';

export const getActiveCarAction = (id) => ({
	type: GET_ACTIVE_CAR_SAGA,
	payload: { id },
});
