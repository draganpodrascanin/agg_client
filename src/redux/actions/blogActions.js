import {
	CREATE_BLOG_SAGA,
	EDIT_BLOG_SAGA,
	GET_ACTIVE_BLOG_SAGA,
	GET_BLOGS_SAGA,
	PUBLISH_BLOG_SAGA,
} from './action-types';

export const createBlogAction = (
	imageId,
	imageAlt,
	thumbnailId,
	thumbnailAlt,
	title,
	content,
	synopsis
) => ({
	type: CREATE_BLOG_SAGA,
	payload: {
		imageId,
		imageAlt,
		thumbnailId,
		thumbnailAlt,
		title,
		content,
		synopsis: synopsis || undefined,
	},
});

export const getBlogsAction = (page, limit, search) => ({
	type: GET_BLOGS_SAGA,
	payload: { page, limit, search },
});

export const editBlogAction = (
	blogId,
	imageId,
	imageAlt,
	thumbnailId,
	thumbnailAlt,
	title,
	content,
	synopsis
) => ({
	type: EDIT_BLOG_SAGA,
	payload: {
		blogId,
		imageId,
		imageAlt,
		thumbnailId,
		thumbnailAlt,
		title,
		content,
		synopsis: synopsis || undefined,
	},
});

export const getActiveBlogAction = (id) => ({
	type: GET_ACTIVE_BLOG_SAGA,
	payload: { id },
});

export const publishBlogAction = (blogId, published) => ({
	type: PUBLISH_BLOG_SAGA,
	payload: { blogId, published },
});
