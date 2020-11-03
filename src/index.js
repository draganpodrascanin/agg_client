import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { combinedReducers } from './redux/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

// const middleware = [window.__REDUX_DEVTOOLS_EXTENSION__, sagaMiddleware];
// const composeEnhancers =
// 	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// 				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
// 		  })
// 		: compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
