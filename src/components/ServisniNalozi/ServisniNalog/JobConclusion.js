import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Create } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../CustomModal';
import EditJobConclusionForm from '../../Forms/JobConclusion';
import { editJobConclusionAction } from '../../../redux/actions/jobConclusionActions';

const useStyles = makeStyles((theme) => ({
	section: {
		margin: '35px 0',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
	},
	editButton: {
		color: theme.palette.warning.main,
		marginLeft: 5,
	},
	charged: {
		background: theme.palette.success.main,
		color: '#fff',

		padding: '2px 5px',
	},
	note: {
		color: theme.palette.secondary.light,
	},
}));

const JobConclusion = ({ jobConclusion }) => {
	const classes = useStyles();
	const admin = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	const [
		openEditJobConclusionModalForm,
		setOpenEditJobConclusionModalForm,
	] = useState(false);

	const onSubmitEditJobConclusion = (val) => {
		dispatch(
			editJobConclusionAction(
				jobConclusion.id,
				val.workDone,
				val.note,
				val.charged
			)
		);
	};

	//-----------------------------------------------------------------------------

	const handleOpenEditJobConclusionModalForm = () => {
		setOpenEditJobConclusionModalForm(!openEditJobConclusionModalForm);
	};
	//----------------------------------------------------------------------------
	if (!jobConclusion)
		return (
			<Typography variant="h6" style={{ margin: '50px 0' }}>
				posao nije zaključen..
			</Typography>
		);

	return (
		<section className={classes.section}>
			{/*-------------------CHANGE STATUS JOB TICKET MODAL FORM ------------------------ */}
			<CustomModal
				open={openEditJobConclusionModalForm}
				onClose={handleOpenEditJobConclusionModalForm}
			>
				<EditJobConclusionForm
					heading="Izmeni zaključak servisnog naloga"
					workDone={jobConclusion.workDone}
					note={jobConclusion.note}
					charged={jobConclusion.charged}
					onSubmit={onSubmitEditJobConclusion}
				/>
			</CustomModal>

			{/*----------------------------------------------------------------------------------- */}
			<div className={classes.header}>
				<Typography variant="h4" component="h3">
					Posao Zaključen
				</Typography>
				{(admin.role === 'admin' || admin.role === 'super-admin') && (
					<Button
						className={classes.editButton}
						variant="outlined"
						color="inherit"
						startIcon={<Create />}
						size="small"
						onClick={handleOpenEditJobConclusionModalForm}
					>
						Izmeni
					</Button>
				)}
			</div>

			<Typography variant="h5" style={{ marginLeft: 1, marginTop: 5 }}>
				Posao Odrađen
			</Typography>
			<Typography variant="body2" style={{ marginLeft: 1, maxWidth: 600 }}>
				{jobConclusion.workDone}
			</Typography>

			<Typography
				variant="h5"
				className={classes.note}
				style={{ marginLeft: 1, marginTop: 5, textDecoration: 'underline' }}
			>
				Napomena
			</Typography>
			<Typography
				variant="body2"
				style={{ marginLeft: 1, marginBottom: 10, maxWidth: 600 }}
			>
				{jobConclusion.note}
			</Typography>

			{(admin.role === 'admin' || admin.role === 'super-admin') && (
				<Typography variant="body1" style={{ marginLeft: 1, marginTop: 10 }}>
					Naplaćeno:{' '}
					<span className={classes.charged}>{jobConclusion.charged}.00 km</span>
				</Typography>
			)}
		</section>
	);
};

JobConclusion.propTypes = {
	jobConclusion: PropTypes.object,
};

export default JobConclusion;
