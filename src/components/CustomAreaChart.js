import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import {
	AreaChart,
	CartesianGrid,
	Area,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
	chartCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		marginBottom: -15,
		marginLeft: 50,
		fontSize: 14,
	},
}));

export const CustomAreaChart = (props) => {
	const classes = useStyles();

	const chartStyle = () => {
		return {
			// backgroundColor: props.backgroundColor,
			borderRadius: '10px',
			paddingTop: '20px',
			paddingRight: '20px',
			textAlign: 'center',
			fontFamily: 'Roboto',
			width: '100%',
			// boxShadow: '5px 10px 20px rgba(0,0,0,.3)',
			height: '100%',
		};
	};

	return (
		<div className={classes.chartCard}>
			<Typography variant="overline" className={classes.title}>
				{props.chartName || null}
			</Typography>
			<AreaChart
				width={props.chartWidth}
				height={props.chartHeight}
				data={props.data}
				style={chartStyle()}
			>
				<CartesianGrid opacity={1} strokeDasharray="2 2" />
				<Area
					type="monotone"
					dataKey={props.YAxisKey}
					stroke="rgba(0,0,0,0)"
					fill={props.areaColor}
				/>
				<XAxis fontSize={14} dataKey={props.XAxisKey} stroke="#0e0e0e" />
				<YAxis fontSize={14} dataKey={props.YAxisKey} stroke="#0e0e0e" />
				<Tooltip />
			</AreaChart>
		</div>
	);
};
