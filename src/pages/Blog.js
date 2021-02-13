import React from 'react';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import Blogs from '../components/Blogs';

const useStyles = makeStyles((theme) => ({
	container: { padding: '36px 0', width: '90%' },
	addBlogButton: {
		color: theme.palette.text.dark,
	},
}));

const Blog = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Container className={classes.container}>
			<header className={classes.header}>
				<Typography component="h1" variant="h2">
					Blog
				</Typography>
				<Button
					variant="outlined"
					color="inherit"
					className={classes.addBlogButton}
					startIcon={<Add />}
					onClick={() => history.push('/blog/create')}
				>
					Novi Blog
				</Button>
			</header>
			<Blogs />
		</Container>
	);
};

export default Blog;
