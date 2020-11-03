import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { Navigation } from './components/Navigation';
import LoginForm from './components/LoginForm';

import 'fontsource-roboto';
import { getCurrentAdminAction } from './redux/actions/authAction';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1e7be2',
		},
	},
});

const App = () => {
	const admin = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentAdminAction());
	}, []);

	// if (!admin.isLoggedIn) return <LoginForm />;

	return !admin.isLoggedIn ? (
		<LoginForm />
	) : (
		<Router basename="/dashboard">
			<div>
				<Navigation />
				<Switch>
					<Route exact path="/">
						<h1>Dashboard</h1>
					</Route>
					<Route exact path="/klijenti">
						<h1>klijenti</h1>
					</Route>
					<Route exact path="/automobili">
						<h1>automobili</h1>
					</Route>
					<Route exact path="/servisni-nalozi">
						<h1>servisni nalozi</h1>
					</Route>
					<Route exact path="/radni-nalozi">
						<h1>radni nalozi</h1>
					</Route>
					<Route exact path="/zakazani-termini">
						<h1>zakazani termini</h1>
					</Route>
					<Route exact path="/racuni">
						<h1>racuni</h1>
					</Route>
					<Route exact path="/blog">
						<h1>blog</h1>
					</Route>
					<Route exact path="/slike">
						<h1>slike</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};
const themedApp = () => (
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);

export default themedApp;
