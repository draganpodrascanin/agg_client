import {
	Button,
	FormControl,
	FormControlLabel,
	makeStyles,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { publishBlogAction } from '../../redux/actions/blogActions';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		minWidth: 400,
	},
	textField: {
		width: '100%',
		marginBottom: 10,
	},
}));

const BlogPublishForm = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = (v) => {
		dispatch(publishBlogAction(props.blogId, v.published));
	};

	const formik = useFormik({
		initialValues: {
			published: props.published || false,
		},
		onSubmit: props.onSubmit || onSubmit,
	});

	const handleOptionChange = (e) => {
		const val = e.target.value === 'true' ? true : false;
		formik.setFieldValue('published', val);
	};

	return (
		<form className={classes.form}>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				Odredi Status Bloga.
			</Typography>
			<FormControl
				component="fieldset"
				style={{ marginBottom: 5, marginLeft: 5 }}
			>
				<RadioGroup
					aria-label="published"
					name="published"
					value={formik.status}
					onChange={handleOptionChange}
				>
					<FormControlLabel
						value={true}
						control={<Radio checked={formik.values.published === true} />}
						label="Objavi"
					/>

					<FormControlLabel
						value={false}
						control={<Radio checked={formik.values.published === false} />}
						label="Skini objavu"
					/>
				</RadioGroup>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				onClick={formik.submitForm}
				disabled={
					!formik.dirty &&
					!(
						formik.values.published === false ||
						formik.values.published === true
					)
				}
			>
				Potvrdi
			</Button>
		</form>
	);
};

BlogPublishForm.propTyps = {
	onSubmit: PropTypes.func,
	blogId: PropTypes.string,
	published: PropTypes.bool,
};

export default BlogPublishForm;
