import { Grid, makeStyles } from '@material-ui/core';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	chartDataClearErrorAction,
	getChartDataAction,
} from '../redux/actions/chartActions';
import { CustomAreaChart } from './CustomAreaChart';
import { CustomBarChart } from './CustomBarChart';

const useStyles = makeStyles({
	chartCard: {
		backgroundColor: '#FFF',
		padding: '10px 30px 10px 0',
		textAlign: 'center',
		borderRadius: 8,
		margin: 8,
		boxShadow: '6px 4px 10px rgba(0,0,0,0.2)',
	},
	span: {
		content: '',
		width: 9,
		height: 9,
		backgroundColor: '#ff0000',
		borderRadius: '100%',
		marginRight: 5,
		marginLeft: 5,
		display: 'inline-block',
	},
});

export const Charts = (props) => {
	const smChartContainer = useRef(null);
	const [smChartWidth, setSmChartWidth] = useState(500);
	const classes = useStyles();

	const dispatch = useDispatch();
	const chartData = useSelector((state) => state.chartData);

	useEffect(() => {
		dispatch(getChartDataAction());
	}, [dispatch]);

	useEffect(() => {
		setTimeout(() => {
			dispatch(chartDataClearErrorAction());
		}, 8000);
	}, [dispatch, chartData.error]);

	useEffect(() => {
		const handleResize = () => {
			if (smChartContainer?.current?.offsetWidth)
				setSmChartWidth(smChartContainer.current.offsetWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div>
			<Grid container justify="space-between">
				<Grid ref={smChartContainer} item md={6} xs={12}>
					<div className={classes.chartCard}>
						<CustomAreaChart
							chartHeight={250}
							chartWidth={smChartWidth - 50}
							areaColor="#25a522"
							backgroundColor="#f5fef5"
							data={chartData.profit}
							XAxisKey="date"
							YAxisKey="profit"
							chartName="Prihodi:"
						></CustomAreaChart>
					</div>
				</Grid>
				<Grid ref={smChartContainer} item md={6} xs={12}>
					<div className={classes.chartCard}>
						<CustomAreaChart
							chartHeight={250}
							chartWidth={smChartWidth - 50}
							areaColor="#ee7e6e"
							backgroundColor="#fef5f5"
							data={chartData.expenses}
							XAxisKey="date"
							YAxisKey="expense"
							chartName="Troškovi:"
						></CustomAreaChart>
					</div>
				</Grid>

				<Grid item xs={12}>
					<div className={classes.chartCard}>
						<CustomBarChart
							title="Prihodi / Troškovi"
							data={chartData.profitAndExpenses}
							chartWidth={props.containerWidth - 50}
							chartHeight={200}
							XAxisKey="date"
							YAxisKey="profit"
							bar1Key="profit"
							bar2Key="expense"
							bar1Fill="#25a522"
							bar2Fill="#ee736e"
						>
							<div
								className={classes.span}
								style={{ backgroundColor: '#25a522' }}
							/>
							Prihodi /{' '}
							<div
								className={classes.span}
								style={{ backgroundColor: '#ee736e' }}
							/>
							Troškovi
						</CustomBarChart>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};
