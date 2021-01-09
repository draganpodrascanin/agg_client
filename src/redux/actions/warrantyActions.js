import { CREATE_WARRANTY_SAGA } from './action-types';

export const createWarrantyAction = (carId, partsUnderWarranty, validUntil) => {
	return {
		type: CREATE_WARRANTY_SAGA,
		payload: {
			carId,
			partsUnderWarranty,
			validUntil,
			warrantyConditionsTitle: 'std-warranty',
		},
	};
};
