import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AdminPanelContent from '../components/AdminPanel';

const useStyles = makeStyles((theme) => ({
	container: { padding: '20px 0', width: '90%' },
}));

const AdminPanel = () => {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<Typography variant="h2" component="h1">
				Admin Panel
			</Typography>
			<AdminPanelContent />
		</Container>
	);
};

export default AdminPanel;
