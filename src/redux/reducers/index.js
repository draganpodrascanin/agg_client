import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { chartDataReducer } from './chartReducer';
import expensesReducer from './expensesReducer';
import { jobConclusionsReducer } from './jobConclusionReducer';

export const combinedReducers = combineReducers({
	admin: authReducer,
	chartData: chartDataReducer,
	expenses: expensesReducer,
	jobConclusions: jobConclusionsReducer,
});
