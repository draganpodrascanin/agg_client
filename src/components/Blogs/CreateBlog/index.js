import React from 'react';
import parse from 'html-react-parser';
import { makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import TextEditor from './TextEditor';
import './blog.scss';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		maxWidth: 1800,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		margin: '0 auto',
	},
	item: {
		width: '40%',
		height: '100%',
		backgroundColor: '#fff',
		boxShadow: '2px 5px 12px rgba(0,0,0,0.2)',
	},
	form: {
		padding: 50,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: 30,
	},
	blog: {
		padding: 50,
	},
	divider: {
		height: 2,
		width: 250,
		background: 'rgba(0,0,0,0.4)',
		marginBottom: 30,
		marginLeft: 1,
	},
}));

const CreateBlog = () => {
	const classes = useStyles();

	const formik = useFormik({
		initialValues: {
			blog: '',
		},
		onSubmit: (v) => {
			alert(JSON.stringify(v));
		},
	});

	const handleBlogChange = (event, editor) => {
		const data = editor.getData();
		formik.setFieldValue('blog', data);
	};

	return (
		<div className={classes.container}>
			<form className={`${classes.item} ${classes.form}`}>
				<Typography variant="h4" component="h2" style={{ marginBottom: 15 }}>
					Blog Editor
				</Typography>
				<div className={classes.divider} />
				<TextEditor value={formik.values.blog} onChange={handleBlogChange} />
			</form>
			<div className={`${classes.item} ${classes.blog} blog`}>
				<Typography variant="h4" component="h2" style={{ marginBottom: 15 }}>
					Preview
				</Typography>
				<div className={classes.divider} />
				<div>{parse(formik.values.blog)}</div>
			</div>
		</div>
	);
};

export default CreateBlog;
