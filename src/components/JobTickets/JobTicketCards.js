import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { statusTranslate } from '../util/statusTranslate';
import { Build } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

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
	ticketCard: {
		width: '100%',
		height: '100%',
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

const JobTicketCards = ({ jobTickets }) => {
	const classes = useStyles();
	let history = useHistory();

	//--------------------------------------------------------------------------------

	const renderTickets = () =>
		jobTickets.map((ticket) => (
			<Grid item lg={4} sm={6} xs={12}>
				<Card
					key={ticket.id}
					className={classes.ticketCard}
					style={
						ticket.status === 'in-progress'
							? { background: 'rgb(75, 149, 231)' }
							: ticket.status === 'finished'
							? { background: '#5FC0B4' }
							: { background: '#FFa820' }
					}
				>
					<CardActionArea
						onClick={() =>
							history.push(`/servisni-nalozi/${ticket.workOrderId}`)
						}
					>
						<CardContent>
							<div className={classes.header}>
								<Typography gutterBottom variant="h5" component="h2">
									{statusTranslate(ticket.status)}
									<Build className={classes.headingIcon} />
								</Typography>
							</div>
							<Typography variant="body2" component="p">
								{ticket.ticket}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		));

	return (
		<section style={{ marginTop: 30 }}>
			{jobTickets && !jobTickets[0] && (
				<Typography variant="body1">Nema radnih naloga..</Typography>
			)}

			{jobTickets && jobTickets[0] && (
				<Grid container spacing={3}>
					{renderTickets()}
				</Grid>
			)}
		</section>
	);
};

JobTicketCards.propTypes = {
	jobTickets: PropTypes.array,
};

export default JobTicketCards;
