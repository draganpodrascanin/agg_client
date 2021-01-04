import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { statusTranslate } from '../../util/statusTranslate';
import { Build, Create } from '@material-ui/icons';
import CustomModal from '../../CustomModal';
import ChangeJobTicketStatusForm from '../../Forms/JobTicketStatus';

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	heading: {
		marginTop: 20,
	},
	headingIcon: {
		position: 'relative',
		marginLeft: 3,
		transform: 'rotate(-100deg)',
	},
	ticketContainer: {
		marginTop: 10,
		display: 'flex',
		'@media screen and (max-width:900px)': {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	ticketCard: {
		maxWidth: 345,
		minWidth: 300,
		marginRight: 10,
		color: '#fff',

		'@media screen and (max-width:900px)': {
			marginRight: 0,
			marginBottom: 10,
			maxWidth: '100%',
			width: '100%',
		},
	},
	cardButton: {
		color: '#fff',
	},
}));

const JobTickets = ({ jobTickets }) => {
	const classes = useStyles();

	//-----------------------------------------------------------------------------
	const [openChangeStatusModalForm, setOpenChangeStatusModalForm] = useState(
		false
	);

	const handleOpenChangeStatusModalForm = () => {
		setOpenChangeStatusModalForm(!openChangeStatusModalForm);
	};

	const [status, setStatus] = useState('');

	//--------------------------------------------------------------------------------

	const renderTickets = () =>
		jobTickets.map((ticket) => (
			<Card
				key={ticket.id}
				className={classes.ticketCard}
				style={
					ticket.status === 'finished'
						? { background: '#5FC0B4' }
						: { background: '#FFa820' }
				}
			>
				<CardContent>
					<div className={classes.header}>
						<Typography gutterBottom variant="h5" component="h2">
							{statusTranslate(ticket.status)}
							<Build className={classes.headingIcon} />
						</Typography>
						<Button
							size="small"
							color="inherit"
							className={classes.cardButton}
							startIcon={<Create />}
							variant="outlined"
						>
							Izmeni
						</Button>
					</div>
					<Typography variant="body2" component="p">
						{ticket.ticket}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						color="inherit"
						className={classes.cardButton}
						onClick={() => {
							setStatus(ticket.status);
							handleOpenChangeStatusModalForm();
						}}
					>
						Promeni status naloga
					</Button>
				</CardActions>
			</Card>
		));

	return (
		<section>
			{/*-------------------CHANGE STATUS JOB TICKET MODAL FORM ------------------------ */}
			<CustomModal
				open={openChangeStatusModalForm}
				onClose={handleOpenChangeStatusModalForm}
			>
				<ChangeJobTicketStatusForm status={status} />
			</CustomModal>

			{/*-------------------------------------------------------------------------------- */}

			<Typography className={classes.heading} variant="h3">
				Radni Nalozi
			</Typography>

			{jobTickets && !jobTickets[0] && (
				<Typography variant="body1">Nema radnih naloga..</Typography>
			)}

			{jobTickets && jobTickets[0] && (
				<div className={classes.ticketContainer}>{renderTickets()}</div>
			)}
		</section>
	);
};

JobTickets.propTypes = {
	jobTickets: PropTypes.array,
};

export default JobTickets;
