import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { Howl } from 'howler';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';
import LoginForm from './components/LoginForm';
import { LoginRoute } from './components/LoginRoute';
import { Navigation } from './components/Navigation';
import { PrivateRoute } from './components/PrivateRoute';
import { MessageRecievedSnackbar } from './components/UI/MessageRecievedSnackbar';
import msgAudio from './notification.mp3';
import ActiveBlog from './pages/ActiveBlog';
import AdminPanel from './pages/AdminPanel';
import { Appointments } from './pages/Appointments';
import Automobil from './pages/Automobil';
import Blog from './pages/Blog';
import BlogKreator from './pages/BlogKreator';
import { Cars } from './pages/Cars';
import { Dashboard } from './pages/Dashboard';
import IzmeniBlog from './pages/IzmeniBlog';
import { Klijenti } from './pages/Klijenti';
import { NotAuthorizedPage } from './pages/NotAuthorized';
import Poruke from './pages/Poruke';
import Racuni from './pages/Racuni';
import RadniNalozi from './pages/RadniNalozi';
import { ServisniNalog } from './pages/ServisniNalog';
import { ServisniNalozi } from './pages/ServisniNalozi';
import { getCurrentAdminAction } from './redux/actions/authAction';
import { newMessageAction } from './redux/actions/messageActions';
import './style.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1e7be2',
		},
	},
});

const socket = io('https://gagatest.xyz');

const howl = new Howl({
	src: msgAudio,
});

const App = () => {
	const admin = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	// const subscribeToNotifications = async () => {
	// 	const sw = await navigator.serviceWorker.ready;
	// 	const push = await sw.pushManager.subscribe({
	// 		userVisibleOnly: true,
	// 		applicationServerKey:
	// 			'BDiOjQq4Dw7hDp-Jou0fg5XVJuNdJwkbiEEO-pTs18SgwTjbOLXVdVnDR-UJWC7P5ZB4_XWwPOJWjegSrMSfsPM',
	// 	});
	// };

	useEffect(() => {
		socket.on('NewMessage', (message) => {
			dispatch(newMessageAction(message));
			howl.play();
		});

		socket.on('disconnect', function () {
			socket.removeAllListeners('NewMessage');
			socket.removeAllListeners('disconnect');
		});

		// if ('serviceWorker' in navigator) {
		// 	subscribeToNotifications();
		// }
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCurrentAdminAction());
	}, [dispatch]);

	return (
		<Router basename="/dashboard">
			<div>
				{admin.isLoggedIn && <Navigation />}
				{admin.role === 'admin' ||
					(admin.role === 'super-admin' && <MessageRecievedSnackbar />)}
				<Switch>
					<LoginRoute exact path="/login">
						<LoginForm />
					</LoginRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						path="/servisni-nalozi/:id"
					>
						<ServisniNalog />
					</PrivateRoute>
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
						path="/automobili/:id"
					>
						<Automobil />
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
						<RadniNalozi />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/zakazani-termini"
					>
						<Appointments />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'mechanic']}
						exact
						path="/racuni"
					>
						<Racuni />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/blog"
					>
						<Blog />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/blog/create"
					>
						<BlogKreator />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/blog/:id/"
					>
						<ActiveBlog />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin', 'blogger']}
						exact
						path="/blog/:id/edit"
					>
						<IzmeniBlog />
					</PrivateRoute>
					<PrivateRoute roles={['super-admin', 'admin']} exact path="/poruke">
						<Poruke />
					</PrivateRoute>
					<PrivateRoute
						roles={['super-admin', 'admin']}
						exact
						path="/adminpanel"
					>
						<AdminPanel />
					</PrivateRoute>
					<PrivateRoute roles={['super-admin', 'admin']} exact path="/">
						<Dashboard />
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
