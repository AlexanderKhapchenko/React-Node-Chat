import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import * as ROUTES from '../../constants/routes';


export default function Login() {

	const history = useHistory();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');
	const isInvalid = password === '' || emailAddress === '';

	const handleLogin = async (event: any) => {
		event.preventDefault();

		try {
			//await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
			history.push(ROUTES.CHAT);
		} catch (error) {
			setEmailAddress('');
			setPassword('');
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = 'Login - Chat Room';
	}, []);

	return (
		<div className="login-wrapper">
			<div className="login-box">
				<h1 className="header"> Login </h1>
				{error && <p className="error">{error}</p>}
				<form onSubmit={handleLogin} method="POST">
					<input aria-label="Enter your email address"
						type="text"
						placeholder="Email address"
						onChange={({ target }) => setEmailAddress(target.value)}
						value={emailAddress}
					/>
					<input aria-label="Enter your password"
						type="password"
						placeholder="Password"
						onChange={({ target }) => setPassword(target.value)}
						value={password}
					/>
					<button
						disabled={isInvalid}
						type="submit"
						className={`${isInvalid && 'disable'}`}
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
}