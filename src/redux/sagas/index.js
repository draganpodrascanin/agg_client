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

import { watchJobConclusionSaga } from './jobConclusionsSaga';

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
		watchJobConclusionSaga(),
	]);
}

export default rootSaga;
