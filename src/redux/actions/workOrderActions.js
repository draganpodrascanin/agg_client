import {
	CLEAR_WORK_ORDERS,
	CREATE_WORK_ORDERS_SAGA,
	DELETE_WORK_ORDER_SAGA,
	GET_WORK_ORDERS_SAGA,
	GET_WORK_ORDER_SAGA,
} from './action-types';

export const createWorkOrderAction = (carRegistration) => {
	return {
		type: CREATE_WORK_ORDERS_SAGA,
		payload: { carRegistration },
	};
};

export const getWorkOrdersAction = (page, limit, search, completed) => {
	return {
		type: GET_WORK_ORDERS_SAGA,
		payload: { page, limit, search, completed },
	};
};

export const clearWorkOrdersAction = () => {
	return {
		type: CLEAR_WORK_ORDERS,
	};
};

export const getWorkOrderAction = (id) => {
	return {
		type: GET_WORK_ORDER_SAGA,
		payload: { id },
	};
};

export const deleteWorkOrderAction = (workOrderId) => {
	return {
		type: DELETE_WORK_ORDER_SAGA,
		payload: { workOrderId },
	};
};
