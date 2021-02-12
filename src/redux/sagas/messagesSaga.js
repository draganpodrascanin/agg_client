import Axios from 'axios';
import dayjs from 'dayjs';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	GET_APPOINTMENTS,
	GET_MESSAGES,
	GET_MESSAGES_SAGA,
	GET_UNREAD_MESSAGES_NUMBER,
	GET_UNREAD_MESSAGES_NUMBER_SAGA,
	MESSAGE_RECEIVED,
	NEW_MESSAGE,
	NEW_MESSAGE_SAGA,
	UI_ERROR,
	UPDATE_MESSAGE_SEEN,
	UPDATE_MESSAGE_SEEN_SAGA,
} from '../actions/action-types';

function* getMessagesSaga(action) {
	let url = `/api/v1/messages?`;

	if (action.payload.search) url += `search=${action.payload.search}&`;
	if (action.payload.page) url += `page=${action.payload.page}&`;
	if (action.payload.limit) url += `limit=${action.payload.limit}&`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: GET_MESSAGES, payload: response.data.data });
	} catch (err) {
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju zakazanih termina.',
		});
	}
}

export function* watchGetMessagesSaga() {
	yield takeLatest(GET_MESSAGES_SAGA, getMessagesSaga);
}

function* updateMessageSeenSaga(action) {
	const { id } = action.payload;
	const url = `/api/v1/messages/${id}`;

	try {
		const response = yield call(() => Axios.patch(url, { seen: true }));
		yield put({ type: UPDATE_MESSAGE_SEEN, payload: response.data.data });
	} catch (err) {
		console.log(err);
	}
}

export function* watchUpdateMessageSeenSaga() {
	yield takeEvery(UPDATE_MESSAGE_SEEN_SAGA, updateMessageSeenSaga);
}

function* getUnreadMessagesNumberSaga() {
	const url = '/api/v1/messages/notSeenNumber';

	try {
		const response = yield call(() => Axios.get(url));
		yield put({
			type: GET_UNREAD_MESSAGES_NUMBER,
			payload: response.data.data,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* watchGetUnreadMessagesNumberSaga() {
	yield takeLatest(
		GET_UNREAD_MESSAGES_NUMBER_SAGA,
		getUnreadMessagesNumberSaga
	);
}

function* newMessageSaga(action) {
	yield put({ type: NEW_MESSAGE, payload: action.payload });
	yield put({ type: MESSAGE_RECEIVED, payload: 'Nova Poruka!' });
}

export function* watchNewMessageSaga() {
	yield takeEvery(NEW_MESSAGE_SAGA, newMessageSaga);
}
