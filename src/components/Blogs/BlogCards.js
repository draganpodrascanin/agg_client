import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Public } from '@material-ui/icons';
import CustomModal from '../CustomModal';
import BlogPublishForm from '../Forms/BlogPublishForm';

const useStyles = makeStyles((theme) => ({
	unpublishedIcon: {
		color: theme.palette.secondary.main,
	},
	publishedIcon: {
		color: theme.palette.success.main,
	},
	card: {
		marginRight: 15,
	},
}));

const BlogCards = ({ blogs, ...props }) => {
	const history = useHistory();
	const classes = useStyles();

	const [fokusedBlog, setFocusedBlog] = useState(null);
	const handleFokusedBlog = (blog) => setFocusedBlog(blog);

	const [openPublishModal, setPublishModal] = useState(false);
	const handlePublishModal = (_, blog) => {
		handleFokusedBlog(blog);
		setPublishModal(!openPublishModal);
	};

	const renderBlogs = (blogs) =>
		blogs.map((blog) => (
			<Grid item lg={4} sm={6} xs={12} key={blog.id}>
				<Card>
					<CardActionArea onClick={() => history.push(`/blog/${blog.id}`)}>
						<CardMedia
							style={{ height: 200 }}
							image={blog.thumbnail.path}
							title={blog.thumbnailAlt}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{blog.title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{blog.synopsis}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions style={{ justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Button
								size="small"
								color="primary"
								onClick={(e) => handlePublishModal(e, blog)}
							>
								Objavi
							</Button>
							<Button
								size="small"
								color="primary"
								onClick={() => history.push(`/blog/${blog.id}/edit`)}
							>
								Izmeni
							</Button>
						</div>
						{blog.published ? (
							<Public className={classes.publishedIcon} />
						) : (
							<Public className={classes.unpublishedIcon} />
						)}
					</CardActions>
				</Card>
			</Grid>
		));

	return (
		<>
			<CustomModal open={openPublishModal} onClose={handlePublishModal}>
				<BlogPublishForm
					published={fokusedBlog?.published}
					blogId={fokusedBlog?.id}
				/>
			</CustomModal>
			<Grid container spacing={3} style={{ marginTop: 30 }}>
				{blogs && renderBlogs(blogs)}
			</Grid>
		</>
	);
};

BlogCards.propTypes = {
	blogs: PropTypes.array,
};

export default BlogCards;
