import Axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
	CLEAR_LOADING,
	CREATE_BLOG,
	CREATE_BLOG_SAGA,
	EDIT_BLOG,
	EDIT_BLOG_SAGA,
	GET_ACTIVE_BLOG,
	GET_ACTIVE_BLOG_SAGA,
	GET_BLOGS,
	GET_BLOGS_SAGA,
	LOADING,
	PUBLISH_BLOG,
	PUBLISH_BLOG_SAGA,
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
			Axios.post('/api/v1/blog', {
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

function* getBlogsSaga(action) {
	let url = '/api/v1/blog?';
	yield put({ type: LOADING });

	if (action.payload.search) url += `search=${action.payload.search}&`;
	if (action.payload.page) url += `page=${action.payload.page}&`;
	if (action.payload.limit) url += `limit=${action.payload.limit}&`;

	try {
		const response = yield call(() => Axios.get(url));
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: GET_BLOGS,
			payload: { count: response.data.count, blogs: response.data.data },
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju blogova.',
		});
	}
}

export function* watchGetBlogs() {
	yield takeLatest(GET_BLOGS_SAGA, getBlogsSaga);
}

export function* getActiveBlog(action) {
	yield put({ type: LOADING });

	try {
		const response = yield call(() =>
			Axios.get(`/api/v1/blog/${action.payload.id}`)
		);

		yield put({ type: GET_ACTIVE_BLOG, payload: response.data.data });
		yield put({ type: CLEAR_LOADING });
	} catch (er) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri preuzimanju bloga..',
		});
	}
}

export function* watchGetActiveBlog() {
	yield takeLatest(GET_ACTIVE_BLOG_SAGA, getActiveBlog);
}

function* editBlogSaga(action) {
	yield put({ type: LOADING });
	const {
		blogId,
		imageId,
		imageAlt,
		thumbnailId,
		thumbnailAlt,
		title,
		content,
		synopsis,
	} = action.payload;

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/blog/${blogId}`, {
				imageId,
				imageAlt,
				thumbnailId,
				thumbnailAlt,
				title,
				content,
				synopsis,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: EDIT_BLOG, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno izmenjen blog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri čuvanju izmena bloga. ',
		});
	}
}

export function* watchEditBlogSaga() {
	yield takeLatest(EDIT_BLOG_SAGA, editBlogSaga);
}

function* publishBlogSaga(action) {
	yield put({ type: LOADING });
	const { blogId, published } = action.payload;

	try {
		const response = yield call(() =>
			Axios.patch(`/api/v1/blog/${blogId}/publish`, {
				published,
			})
		);

		yield put({ type: CLEAR_LOADING });
		yield put({ type: PUBLISH_BLOG, payload: response.data.data });
		yield put({
			type: SUCCESS,
			payload: 'Uspešno izmenjen blog.',
		});
	} catch (err) {
		yield put({ type: CLEAR_LOADING });
		yield put({
			type: UI_ERROR,
			payload: 'Greška pri objavi bloga. ',
		});
	}
}

export function* watchPublishBlog() {
	yield takeLatest(PUBLISH_BLOG_SAGA, publishBlogSaga);
}
