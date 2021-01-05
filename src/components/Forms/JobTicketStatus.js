import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
	Button,
	FormControl,
	FormControlLabel,
	makeStyles,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editJobTicketAction } from '../../redux/actions/jobTicketsActions';

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

const JobTicketStatus = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onSubmit = (v) => {
		dispatch(editJobTicketAction(props.jobTicketId, v.status));
	};

	const formik = useFormik({
		initialValues: {
			status: props.status || '',
		},
		onSubmit: props.onSubmit || onSubmit,
	});

	const handleOptionChange = (e) => {
		formik.setFieldValue('status', e.target.value);
	};

	return (
		<form className={classes.form}>
			<Typography variant="h4" component="h3" style={{ marginLeft: -1 }}>
				Promeni Status Radnog Naloga
			</Typography>
			<FormControl
				component="fieldset"
				style={{ marginBottom: 5, marginLeft: 5 }}
			>
				<RadioGroup
					aria-label="status"
					name="status"
					value={formik.status}
					onChange={handleOptionChange}
				>
					<FormControlLabel
						value="to-do"
						control={<Radio checked={formik.values.status === 'to-do'} />}
						label="Na Čekanju"
					/>

					<FormControlLabel
						value="in-progress"
						control={<Radio checked={formik.values.status === 'in-progress'} />}
						label="Rad u toku"
					/>
					<FormControlLabel
						value="waiting-for-parts"
						control={
							<Radio checked={formik.values.status === 'waiting-for-parts'} />
						}
						label="Čekanje na delove"
					/>
					<FormControlLabel
						value="finished"
						control={<Radio checked={formik.values.status === 'finished'} />}
						label="Završeno"
					/>
				</RadioGroup>
			</FormControl>
			<Button variant="contained" color="primary" onClick={formik.submitForm}>
				Potvrdi
			</Button>
		</form>
	);
};

JobTicketStatus.propTyps = {
	onSubmit: PropTypes.func,
	jobTicketId: PropTypes.string,
	status: PropTypes.oneOf([
		'to-do',
		'waiting-for-parts',
		'in-progress',
		'finished',
	]),
};

export default JobTicketStatus;
