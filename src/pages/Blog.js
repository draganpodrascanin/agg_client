import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	container: { padding: '20px 0', width: '90%' },
	addBlogButton: {
		color: theme.palette.success.dark,
	},
}));

const Blog = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Container className={classes.container}>
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
		</Container>
	);
};

export default Blog;
