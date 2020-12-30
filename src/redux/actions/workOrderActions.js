import {
	CLEAR_WORK_ORDERS,
	CREATE_WORK_ORDER_SAGA,
	GET_WORK_ORDERS_SAGA,
} from './action-types';

export const createWorkOrderAction = (carRegistration) => {
	return {
		type: CREATE_WORK_ORDER_SAGA,
		payload: { carRegistration },
	};
};

export const getWorkOrdersAction = (page, limit, search) => {
	return {
		type: GET_WORK_ORDERS_SAGA,
		payload: { page, limit, search },
	};
};

export const clearWorkOrdersAction = () => {
	return {
		type: CLEAR_WORK_ORDERS,
	};
};