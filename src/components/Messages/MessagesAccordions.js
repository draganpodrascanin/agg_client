import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MarkunreadMailbox } from '@material-ui/icons';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMessageSeenAction } from '../../redux/actions/messageActions';

//----------------STYLED COMPONENT--------------------------------------
const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

//----------------STYLED COMPONENT--------------------------------------
const AccordionSummary = withStyles((theme) => ({
	root: {
		backgroundColor: 'rgba(0, 0, 30, .02)',
		// backgroundColor: theme.palette.primary.light,
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		// borderBottom: '1px solid rgba(255, 255, 2555, .125)',
		// color: '#fff',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

//------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	container: {
		margin: '20px 0',
	},
	notSeenIcon: {
		color: theme.palette.secondary.main,
		marginLeft: 20,
	},
	messageText: {
		marginTop: 10,
	},
}));

const MessagesAccordions = ({ messages }) => {
	const [expanded, setExpanded] = React.useState('');
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	if (!messages) return <Typography variant="h4">loading..</Typography>;

	const handleMessageSeen = (id) => {
		dispatch(updateMessageSeenAction(id));
	};

	return (
		<div className={classes.container}>
			{messages.map((msg) => (
				<Accordion
					square
					expanded={expanded === msg.id}
					onChange={handleChange(msg.id)}
					onClick={() => {
						if (!msg.seen) handleMessageSeen(msg.id);
					}}
					key={msg.id}
				>
					<AccordionSummary>
						<Typography>
							{msg.name} - {dayjs(msg.createdAt).format('DD.MM.YYYY')}
						</Typography>
						{!msg.seen && <MarkunreadMailbox className={classes.notSeenIcon} />}
					</AccordionSummary>
					<AccordionDetails style={{ flexDirection: 'column' }}>
						<Typography variant="body2" color="textSecondary" component="p">
							Ime - {msg.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Broj Telefona - {msg.phone}
						</Typography>
						{msg.email && (
							<Typography variant="body2" color="textSecondary" component="p">
								Email - {msg.email}
							</Typography>
						)}
						<Typography variant="body2" color="textSecondary" component="p">
							Automobil - {msg.car}
						</Typography>
						<Typography
							variant="body1"
							component="p"
							className={classes.messageText}
						>
							{msg.message}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

MessagesAccordions.propTyps = {
	messages: PropTypes.array,
};

export default MessagesAccordions;
