const { combineReducers } = require('redux');
const { authReducer } = require('./authReducer');

export const combinedReducers = combineReducers({
	admin: authReducer,
});
