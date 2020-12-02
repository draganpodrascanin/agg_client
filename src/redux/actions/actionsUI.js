const {
	LOADING,
	SUCCESS,
	CLEAR_LOADING,
	UI_ERROR,
	CLEAR_UI_ERROR,
} = require('./action-types');

export const loadingAction = () => {
	return { type: LOADING };
};

export const clearLoadingAction = () => {
	return { type: CLEAR_LOADING };
};
export const successAction = (msg) => {
	return { type: SUCCESS, payload: msg };
};

export const clearSuccessAction = (msg) => {
	return { type: SUCCESS, payload: msg };
};

export const uiErrorAction = (msg) => {
	return { type: UI_ERROR, payload: msg };
};

export const clearUiErrorAction = () => {
	return { type: CLEAR_UI_ERROR };
};
