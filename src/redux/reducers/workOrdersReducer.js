import {
	CREATE_WORK_ORDERS,
	GET_WORK_ORDERS,
	CLEAR_WORK_ORDERS,
	SET_WORK_ORDERS_LOADING,
	CLEAR_WORK_ORDERS_LOADING,
	DELETE_WORK_ORDER,
} from '../actions/action-types';

const initialState = {
	workOrders: [],
	loading: false,
	error: '',
	count: 1,
};

export const workOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_WORK_ORDERS:
			const newWorkOrder = { ...action.payload, jobTickets: [] };
			return { ...state, workOrders: [newWorkOrder, ...state.workOrders] };
		case GET_WORK_ORDERS:
			return {
				...state,
				workOrders: [...state.workOrders, ...action.payload.workOrders],
				count: action.payload.count,
			};
		case SET_WORK_ORDERS_LOADING:
			return { ...state, loading: true };
		case DELETE_WORK_ORDER:
			const newWorkOrders = state.workOrders.filter(
				(workOrder) => workOrder.id !== action.payload.id
			);
			return { ...state, workOrders: newWorkOrders };
		case CLEAR_WORK_ORDERS_LOADING:
			return { ...state, loading: false };
		case CLEAR_WORK_ORDERS:
			return { ...state, workOrders: [] };
		default:
			return state;
	}
};
