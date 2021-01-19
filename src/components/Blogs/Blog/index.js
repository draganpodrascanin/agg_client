import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getActiveBlogAction } from '../../../redux/actions/blogActions';
import { LoadingModal } from '../../UI/LoadingModal';
import parse from 'html-react-parser';
import './style.scss';

const useStyles = makeStyles((theme) => ({
	editButton: {
		background: theme.palette.warning.main,
		color: '#fff',

		'&:hover': {
			background: theme.palette.warning.dark,
		},
	},
}));

const Blog = () => {
	const blogId = useParams().id;
	const blog = useSelector((state) => state.activeBlog);
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		dispatch(getActiveBlogAction(blogId));
	}, [dispatch, blogId]);

	if (!blog) return <LoadingModal />;

	return (
		<>
			<div className="blog">
				<header style={{ background: `url(${blog.image.path})` }}>
					<h1>{blog.title}</h1>
					<div style={{ width: 600, margin: '0 auto' }}>
						<Button
							variant="contained"
							size="large"
							className={classes.editButton}
							onClick={() => history.push(`/blog/${blog.id}/edit`)}
						>
							Izmeni
						</Button>
					</div>
				</header>

				<div className="content">{parse(blog.content)}</div>
			</div>
		</>
	);
};

export default Blog;
