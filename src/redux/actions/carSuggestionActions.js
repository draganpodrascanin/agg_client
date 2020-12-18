import {
	CAR_SUGGESTION_CLOSE,
	CAR_SUGGESTION_ERROR,
	CAR_SUGGESTION_LOADING,
	CAR_SUGGESTION_OPEN,
	CLEAR_CAR_SUGGESTION_ERROR,
	CLEAR_CAR_SUGGESTION_LOADING,
	GET_CAR_SUGGESTIONS_SAGA,
} from './action-types';

export const carSuggestionOpenAction = () => ({ type: CAR_SUGGESTION_OPEN });
export const carSuggestionCloseAction = () => ({ type: CAR_SUGGESTION_CLOSE });
export const carSuggestionLoadingAction = () => ({
	type: CAR_SUGGESTION_LOADING,
});
export const carSuggestionClearLoadingAction = () => ({
	type: CLEAR_CAR_SUGGESTION_LOADING,
});
export const carSuggestionErrorAction = (error) => ({
	type: CAR_SUGGESTION_ERROR,
	payload: error,
});
export const carSuggestionErrorClearAction = (error) => ({
	type: CLEAR_CAR_SUGGESTION_ERROR,
});

export const getCarSuggestionsAction = (search) => {
	return { type: GET_CAR_SUGGESTIONS_SAGA, payload: search };
};
