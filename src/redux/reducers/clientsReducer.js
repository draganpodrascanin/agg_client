const {
	GET_CLIENTS,
	CLIENTS_ERROR,
	CLEAR_CLIENTS_ERROR,
	GET_ACTIVE_CLIENT,
	CLEAR_ACTIVE_CLIENT,
	CLIENTS_LOADING,
	CLEAR_CLIENTS_LOADING,
	CREATE_CLIENT,
} = require('../actions/action-types');

const initalState = {
	clients: [],
	activeClient: {},
	error: null,
	count: 0,
	loading: false,
};

const clientsReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_CLIENTS:
			return {
				...state,
				clients: action.payload.clients,
				count: action.payload.count,
			};
		case GET_ACTIVE_CLIENT:
			return { ...state, activeClient: action.payload };
		case CLEAR_ACTIVE_CLIENT:
			return { ...state, activeClient: {} };
		case CREATE_CLIENT:
			return { ...state, client: [action.payload, ...state.clients] };
		case CLIENTS_LOADING:
			return { ...state, loading: true };
		case CLEAR_CLIENTS_LOADING:
			return { ...state, loading: false };
		case CLIENTS_ERROR:
			return { ...state, error: action.payload };
		case CLEAR_CLIENTS_ERROR:
			return { ...state, error: '' };
		default:
			return state;
	}
};

export default clientsReducer;
