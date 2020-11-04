import { Grid } from '@material-ui/core';
import React, { useRef, useEffect, useState } from 'react';
import { CustomAreaChart } from './CustomAreaChart';
import { CustomBarChart } from './CustomBarChart';

export const Charts = (props) => {
	const smChartContainer = useRef(null);
	const [smChartWidth, setSmChartWidth] = useState(500);
	useEffect(() => {
		const handleResize = () => {
			if (smChartContainer?.current?.offsetWidth)
				setSmChartWidth(smChartContainer.current.offsetWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	const data = [
		{ prihod: 200, rashod: 140, datum: '12-20-2020' },
		{ prihod: 300, rashod: 220, datum: '13-20-2020' },
		{ prihod: 240, rashod: 230, datum: '14-20-2020' },
		{ prihod: 600, rashod: 200, datum: '16-20-2020' },
		{ prihod: 520, rashod: 150, datum: '18-02-2020' },
		{ prihod: 420, rashod: 150, datum: '20-02-2020' },
		{ prihod: 1420, rashod: 150, datum: '21-02-2020' },
		{ prihod: 1520, rashod: 1150, datum: '22-02-2020' },
		{ prihod: 820, rashod: 850, datum: '25-02-2020' },
		{ prihod: 920, rashod: 2150, datum: '26-02-2020' },
		{ prihod: 520, rashod: 150, datum: '27-02-2020' },
		{ prihod: 300, rashod: 200, datum: '30-03-2020' },
		{ prihod: 1200, rashod: 260, datum: '01-04-2020' },
	];

	return (
		<div>
			<Grid container spacing={1}>
				<Grid ref={smChartContainer} item md={6} xs={12}>
					<CustomAreaChart
						chartHeight={250}
						chartWidth={smChartWidth}
						areaColor="#25a522"
						backgroundColor="#f5fef5"
						data={data}
						XAxisKey="datum"
						YAxisKey="prihod"
						chartName="Prihodi:"
					></CustomAreaChart>
				</Grid>
				<Grid ref={smChartContainer} item md={6} xs={12}>
					<CustomAreaChart
						chartHeight={250}
						chartWidth={smChartWidth}
						areaColor="#ee7e6e"
						backgroundColor="#fef5f5"
						data={data}
						XAxisKey="datum"
						YAxisKey="rashod"
						chartName="Rashodi:"
					></CustomAreaChart>
				</Grid>
				<CustomBarChart
					title="Prihodi / Rashodi"
					data={data}
					chartWidth={props.containerWidth}
					chartHeight={200}
					XAxisKey="datum"
					YAxisKey="prihod"
					bar1Key="prihod"
					bar2Key="rashod"
					bar1Fill="#25a522"
					bar2Fill="#ee736e"
				/>
				<Grid item xs={12}></Grid>
			</Grid>
		</div>
	);
};
