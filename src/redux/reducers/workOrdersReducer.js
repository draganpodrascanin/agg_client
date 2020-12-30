import {
	CREATE_WORK_ORDER,
	GET_WORK_ORDERS,
	CLEAR_WORK_ORDERS,
} from '../actions/action-types';

const initialState = {
	workOrders: [],
	loading: false,
	error: '',
	count: 1,
};

export const workOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_WORK_ORDER:
			return { ...state, workOrders: [action.payload, ...state.workOrders] };
		case GET_WORK_ORDERS:
			return { ...state, workOrders: [...action.payload, ...state.workOrders] };
		case CLEAR_WORK_ORDERS:
			return { ...state, workOrders: [] };
		default:
			return state;
	}
};
