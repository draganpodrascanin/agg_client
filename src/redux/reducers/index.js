import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chartDataReducer } from './chartReducer';
import expensesReducer from './expensesReducer';

export const combinedReducers = combineReducers({
	admin: authReducer,
	chartData: chartDataReducer,
	expenses: expensesReducer,
});
