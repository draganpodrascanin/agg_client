import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Grid,
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
	},
	card: {
		height: '100%',
		alignItems: 'stretch',
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
		<Grid
			item
			lg={4}
			sm={6}
			xs={12}
			key={workOrder.id}
			alignItems="stretch"
			className={classes.card}
		>
			<Card>
				<CardActionArea
					onClick={() => history.push(`/servisni-nalozi/${workOrder.id}`)}
				>
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
						<Button component="p" size="small" color="primary">
							Otvori Nalog
						</Button>
					</CardActions>
				</CardActionArea>
			</Card>
		</Grid>
	));

	//------------------------------------------------
	return (
		<section className={classes.section}>
			<Typography variant="h3" component="h3">
				Servisni Nalozi
			</Typography>
			<Grid
				container
				spacing={3}
				justify="flex-start"
				className={classes.cardContainer}
			>
				{renderCards}
			</Grid>
		</section>
	);
};

WorkOrders.propTypes = {
	workOrders: PropTypes.array,
};

export default WorkOrders;
