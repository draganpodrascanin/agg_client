import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Create } from '@material-ui/icons';
import { useSelector } from 'react-redux';

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
		color: theme.palette.secondary.main,
	},
}));

const JobConclusion = ({ jobConclusion }) => {
	const classes = useStyles();
	const admin = useSelector((state) => state.admin);

	if (!jobConclusion)
		return (
			<Typography variant="h6" style={{ margin: '50px 0' }}>
				posao nije zaključen..
			</Typography>
		);

	return (
		<section className={classes.section}>
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
					>
						Izmeni
					</Button>
				)}
			</div>

			<Typography
				variant="body1"
				style={{ marginLeft: 1, marginTop: 5, textDecoration: 'underline' }}
			>
				Posao Odrađen:
			</Typography>
			<Typography variant="body2" style={{ marginLeft: 5, maxWidth: 600 }}>
				{jobConclusion.workDone}
			</Typography>

			<Typography
				variant="body1"
				className={classes.note}
				style={{ marginLeft: 1, marginTop: 5, textDecoration: 'underline' }}
			>
				NAPOMENA
			</Typography>
			<Typography variant="body2" style={{ marginLeft: 5, maxWidth: 600 }}>
				{jobConclusion.note}
			</Typography>

			{(admin.role === 'admin' || admin.role === 'super-admin') && (
				<Typography variant="body1" style={{ marginTop: 10 }}>
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
