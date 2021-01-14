import {
	CREATE_WARRANTY_SAGA,
	DELETE_WARRANTY_SAGA,
	EDIT_WARRANTY_SAGA,
	GET_WARRANTIES_SAGA,
} from './action-types';

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

export const getWarrantiesAction = (carId) => ({
	type: GET_WARRANTIES_SAGA,
	payload: { carId },
});

export const editWarrantyAction = (
	warrantyId,
	partsUnderWarranty,
	validUntil
) => {
	return {
		type: EDIT_WARRANTY_SAGA,
		payload: {
			warrantyId,
			partsUnderWarranty,
			validUntil,
			warrantyConditionsTitle: 'std-warranty',
		},
	};
};

export const deleteWarrantyAction = (warrantyId) => ({
	type: DELETE_WARRANTY_SAGA,
	payload: { warrantyId },
});
