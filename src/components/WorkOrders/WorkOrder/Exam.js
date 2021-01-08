import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Create } from '@material-ui/icons';
import CustomModal from '../../CustomModal';
import EditExamForm from '../../Forms/CarExam';

const useStyles = makeStyles((theme) => ({
	examSection: {
		marginTop: 15,
		padding: '15px 0',
	},
	header: {
		display: 'flex',
		marginBottom: 12,
	},
	headerButton: {
		color: theme.palette.warning.dark,
		marginLeft: 15,
		alignSelf: 'center',
	},
	text: {
		maxWidth: 600,
	},
}));

const Exam = ({ exam }) => {
	const classes = useStyles();

	//-----------------------------------------------------------------------------
	const [openEditExamForm, setOpenEditExamForm] = useState(false);

	const handleOpenEditExamForm = () => {
		setOpenEditExamForm(!openEditExamForm);
	};
	//-----------------------------------------------------------------------------
	if (!exam)
		return (
			<Typography variant="h5" component="h2">
				Pregled nije obavljen.
			</Typography>
		);

	return (
		<section className={classes.examSection}>
			{/*----------------------- EDIT CAR EXAM MODAL FORM ------------------------------ */}
			<CustomModal open={openEditExamForm} onClose={handleOpenEditExamForm}>
				<EditExamForm
					heading="Izmeni Pregled Automobila"
					examConclusion={exam.examConclusion}
				/>
			</CustomModal>

			{/*-------------------------------------------------------------------------------- */}
			<div className={classes.header}>
				<Typography variant="h4" component="h2">
					Pregled
				</Typography>
				<Button
					variant="outlined"
					startIcon={<Create />}
					color="inherit"
					className={classes.headerButton}
					size="small"
					onClick={handleOpenEditExamForm}
				>
					Izmeni Pregled
				</Button>
			</div>
			<Typography variant="body1" className={classes.text}>
				{exam.examConclusion}
			</Typography>
		</section>
	);
};

Exam.propTypes = {
	exam: PropTypes.object,
};

export default Exam;
