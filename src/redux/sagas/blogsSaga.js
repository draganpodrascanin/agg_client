import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_BLOG,
	CREATE_BLOG_SAGA,
	LOADING,
	SUCCESS,
	UI_ERROR,
} from '../actions/action-types';

function* createBlogSaga(action) {
	yield put({ type: LOADING });
	const {
		imageId,
		imageAlt,
		thumbnailId,
		thumbnailAlt,
		title,
		content,
	} = action.payload;

	try {
		const response = yield call(() =>
			Axios.post('/api/v1/blogs', {
				imageId,
				imageAlt,
				thumbnailId,
				thumbnailAlt,
				title,
				content,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: CREATE_BLOG, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno kreiran blog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri kreiranju bloga. ',
		});
	}
}

export function* watchCreateBlogSaga() {
	yield takeLatest(CREATE_BLOG_SAGA, createBlogSaga);
}
