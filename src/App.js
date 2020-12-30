import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import {
	createMuiTheme,
	makeStyles,
	ThemeProvider,
} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { Navigation } from './components/Navigation';
import LoginForm from './components/LoginForm';

import 'fontsource-roboto';
import { getCurrentAdminAction } from './redux/actions/authAction';
import { LoginRoute } from './components/LoginRoute';
import { NotAuthorizedPage } from './pages/NotAuthorized';
import { Dashboard } from './pages/Dashboard';

import './style.css';
import { Klijenti } from './pages/Klijenti';
import { Cars } from './pages/Cars';
import { ServisniNalozi } from './pages/ServisniNalozi';

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
	}, [dispatch]);

	// if (!admin.isLoggedIn) return <LoginForm />;

	return (
		<Router basename="/dashboard">
			<div>
				{admin.isLoggedIn && <Navigation />}
				<Switch>
					<LoginRoute exact path="/login">
						<LoginForm />
					</LoginRoute>
					<Route path="/forgot-password">forgot password</Route>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic', 'blogger']}
						exact
						path="/zabranjen-pristup"
					>
						<NotAuthorizedPage />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/klijenti"
					>
						<Klijenti />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/automobili"
					>
						<Cars />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/servisni-nalozi"
					>
						<ServisniNalozi />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/radni-nalozi"
					>
						<h1>radni nalozi</h1>
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/zakazani-termini"
					>
						<h1>zakazani termini</h1>
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/racuni"
					>
						<h1>racuni</h1>
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/blog"
					>
						<h1>blog</h1>
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/slike"
					>
						<h1>slike</h1>
					</PrivateRoute>
					<PrivateRoute roles={['super-admin', 'admin']} exact path="/">
						<h1>
							<Dashboard />
						</h1>
					</PrivateRoute>
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
