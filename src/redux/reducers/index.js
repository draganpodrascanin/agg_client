import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import carsReducer from './carsReducer';
import { carSuggestionReducer } from './carSuggestionReducer';
import { chartDataReducer } from './chartReducer';
import clientsReducer from './clientsReducer';
import expensesReducer from './expensesReducer';
import { jobConclusionsReducer } from './jobConclusionReducer';
import UIReducer from './UIReducer';

export const combinedReducers = combineReducers({
	admin: authReducer,
	chartData: chartDataReducer,
	expenses: expensesReducer,
	clients: clientsReducer,
	jobConclusions: jobConclusionsReducer,
	UI: UIReducer,
	carSuggestions: carSuggestionReducer,
	cars: carsReducer,
});
