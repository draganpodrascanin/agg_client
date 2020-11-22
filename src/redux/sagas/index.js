import { all } from 'redux-saga/effects';
import {
	watchGetCurrentAdminSaga,
	watchLoginSaga,
	watchLogoutSaga,
} from './authSaga';
import { watchGetChartDataSaga } from './chartSaga';
import {
	watchGetExpensesSaga,
	watchCreateExpenseSaga,
	watchUpdateExpenseSaga,
	watchDeleteExpenseSaga,
} from './expensesSaga';

function* rootSaga() {
	yield all([
		watchLoginSaga(),
		watchGetCurrentAdminSaga(),
		watchLogoutSaga(),
		watchGetChartDataSaga(),
		watchGetExpensesSaga(),
		watchCreateExpenseSaga(),
		watchUpdateExpenseSaga(),
		watchDeleteExpenseSaga(),
	]);
}

export default rootSaga;
