import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	section: {
		padding: '30px 0',
	},
	cardContainer: {
		margin: '15px 0',
		display: 'flex',
		// justifyContent: 'space-evenly',
		alignContent: 'stretch',
		flexWrap: 'wrap',
	},
	card: {
		alignSelf: 'stretch',
		marginRight: 20,
		marginBottom: 10,
		minWidth: 380,
		width: 380,

		'@media screen and (max-width: 900px)': {
			margin: '0 0 20px 0',
			width: '90%',
		},
	},
	cardContent: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
}));

const WorkOrders = ({ workOrders }) => {
	const classes = useStyles();
	const history = useHistory();

	//========= NO WORK ORDERS ===================================================================
	if (!workOrders || !workOrders[0])
		return (
			<Typography className={classes.section}>
				Nema servisnih naloga za ovaj automobil..
			</Typography>
		);
	//============================================================================================

	const renderCards = workOrders.map((workOrder) => (
		<div key={workOrder.id} className={classes.card}>
			<Card className={classes.cardContent}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						DATUM: {dayjs(workOrder.createdAt).format('DD.MM.YYYY')}
					</Typography>
					<Typography variant="body1" component="p">
						{workOrder.jobConclusion
							? workOrder.jobConclusion.workDone
							: 'Nalog i dalje nije zaključen.'}
					</Typography>
					{workOrder.jobConclusion && workOrder.jobConclusion.note && (
						<Typography
							variant="body2"
							color="secondary"
							style={{ marginTop: 10 }}
						>
							{workOrder.jobConclusion.note}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						component="p"
						size="small"
						color="primary"
						onClick={() => history.push(`/servisni-nalozi/${workOrder.id}`)}
					>
						Otvori Nalog
					</Button>
				</CardActions>
			</Card>
		</div>
	));

	//------------------------------------------------
	return (
		<section className={classes.section}>
			<Typography variant="h3" component="h3" style={{ marginLeft: -1 }}>
				Servisni Nalozi
			</Typography>
			<div className={classes.cardContainer}>{renderCards}</div>
		</section>
	);
};

WorkOrders.propTypes = {
	workOrders: PropTypes.array,
};

export default WorkOrders;
