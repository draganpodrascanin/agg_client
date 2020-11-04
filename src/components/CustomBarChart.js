import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const useStyle = makeStyles({
	chartCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		marginBottom: -15,
		marginLeft: 50,
	},
});

export const CustomBarChart = (props) => {
	const classes = useStyle();

	return (
		<div className={classes.chartCard}>
			<Typography className={classes.title}>{props.title}</Typography>
			<BarChart
				width={props.chartWidth}
				height={props.chartHeight}
				data={props.data}
				style={{
					// marginTop: 30,
					width: '100%',
					height: '100%',
					paddingTop: 30,
					borderRadius: '10px',
					fontFamily: 'Roboto',
					// boxShadow: '10px 15px 20px rgba(0,0,0,0.3)',
					// backgroundColor: '#fafffa',
				}}
			>
				<XAxis fontSize={14} dataKey={props.XAxisKey} stroke="#0e0e0e" />
				<YAxis fontSize={14} datakey={props.YAxisKey} stroke="#0e0e0e" />
				<Tooltip />
				<Bar dataKey={props.bar1Key} fill={props.bar1Fill} />
				<Bar dataKey={props.bar2Key} fill={props.bar2Fill} />
				<CartesianGrid strokeDasharray="3 3" />
			</BarChart>
		</div>
	);
};
