import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogEditor from '../BlogEditor';
import {
	editBlogAction,
	getActiveBlogAction,
} from '../../../redux/actions/blogActions';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
	const dispatch = useDispatch();
	const blogId = useParams().id;
	const activeBlog = useSelector((state) => state.activeBlog);

	useEffect(() => {
		dispatch(getActiveBlogAction(blogId));
	}, [dispatch, blogId]);

	const editBlogSubmit = (v) => {
		dispatch(
			editBlogAction(
				blogId,
				v.imageId,
				v.imageAlt,
				v.thumbnailId,
				v.thumbnailAlt,
				v.title,
				v.blog,
				v.synopsis
			)
		);
	};

	return (
		<>
			<BlogEditor
				blog={activeBlog?.content || ''}
				title={activeBlog?.title || ''}
				image={activeBlog?.image || ''}
				thumbnail={activeBlog?.thumbnail || ''}
				imageAlt={activeBlog?.imageAlt || ''}
				imageId={activeBlog?.image?.id || ''}
				thumbnailAlt={activeBlog?.thumbnailAlt || ''}
				thumbnailId={activeBlog?.thumbnail?.id || ''}
				synopsis={activeBlog?.synopsis || ''}
				buttonText="izmeni blog"
				onSubmit={editBlogSubmit}
			/>
		</>
	);
};

export default EditBlog;
