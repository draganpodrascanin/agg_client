import { CREATE_BLOG_SAGA } from './action-types';

export const createBlogAction = (
	imageId,
	imageAlt,
	thumbnailId,
	thumbnailAlt,
	title,
	content
) => ({
	type: CREATE_BLOG_SAGA,
	payload: { imageId, imageAlt, thumbnailId, thumbnailAlt, title, content },
});
