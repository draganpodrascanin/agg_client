import { Breadcrumbs, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((e) => {
	return {
		header: {
			padding: '2rem 0',
		},
		breadcrum: {
			color: e.palette.text.secondary,
			textTransform: 'capitalize',
			textDecoration: 'none',
			'&:hover': {
				color: e.palette.text.primary,
			},
		},
	};
});

export const Header = (props) => {
	const classes = useStyles();
	const bcdAdditionalStyle = (lastChild) => {
		if (lastChild) return { color: '#0e0e0e' };
		return {};
	};

	const renderBreadcrums = props?.breadcrums?.map((breadcrum, idx) => {
		return (
			<Link
				to={breadcrum.path}
				className={classes.breadcrum}
				style={bcdAdditionalStyle(idx === props.breadcrums.length - 1)}
				key={breadcrum.path}
			>
				{breadcrum.name}
			</Link>
		);
	});
	return (
		<header className={classes.header}>
			<Typography component="h1" variant="h2">
				{props.children}
			</Typography>
			<Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 5 }}>
				{renderBreadcrums}
			</Breadcrumbs>
		</header>
	);
};
