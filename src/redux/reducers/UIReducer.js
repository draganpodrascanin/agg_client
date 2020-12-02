const {
	LOADING,
	SUCCESS,
	CLEAR_LOADING,
	CLEAR_SUCCESS,
	UI_ERROR,
	CLEAR_UI_ERROR,
} = require('../actions/action-types');

const initalState = {
	loading: false,
	successMessage: '',
	uiError: '',
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
		default:
			return state;
	}
};

export default UIReducer;
