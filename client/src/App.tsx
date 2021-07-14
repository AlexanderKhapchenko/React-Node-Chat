import React, { Suspense } from 'react';
import './App.css';
import Preloader from './components/preloader/preloader';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Chat = React.lazy(() => import('./components/chat/chat'));
const Login = React.lazy(() => import('./components/login/login'));

const App: React.FC = () => {
  return (
		<Router>
			<Suspense fallback={<Preloader />}>
				<Switch>
					<Route path={ROUTES.CHAT} exact>
					  <Chat/>
					</Route>
					<Route path={ROUTES.LOGIN}>
					  <Login/>
					</Route>
				</Switch>
			</Suspense>
		</Router>
  );
}

export default App;
