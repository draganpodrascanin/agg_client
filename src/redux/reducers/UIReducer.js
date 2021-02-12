const {
	LOADING,
	SUCCESS,
	CLEAR_LOADING,
	CLEAR_SUCCESS,
	UI_ERROR,
	CLEAR_UI_ERROR,
	MESSAGE_RECEIVED,
	CLEAR_MESSAGE_RECEIVED,
} = require('../actions/action-types');

const initalState = {
	loading: false,
	successMessage: '',
	uiError: '',
	messageRecieved: '',
};

const UIReducer = (state = initalState, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case CLEAR_LOADING:
			return { ...state, loading: false };
		case SUCCESS:
			return { ...state, successMessage: action.payload };
		case CLEAR_SUCCESS:
			return { ...state, successMessage: '' };
		case UI_ERROR:
			return { ...state, uiError: action.payload };
		case CLEAR_UI_ERROR:
			return { ...state, uiError: '' };
		case MESSAGE_RECEIVED:
			console.log(action.payload);
			return { ...state, messageRecieved: action.payload };
		case CLEAR_MESSAGE_RECEIVED:
			return { ...state, messageRecieved: '' };
		default:
			return state;
	}
};

export default UIReducer;
