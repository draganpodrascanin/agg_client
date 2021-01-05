import { CREATE_CAR_RECEPTION_SAGA } from './action-types';

export const createCarReceptionAction = (
	workOrderId,
	carDamage,
	ownerRemarks,
	milage
) => ({
	type: CREATE_CAR_RECEPTION_SAGA,
	payload: {
		workOrderId,
		carDamage,
		ownerRemarks,
		milage,
	},
});
