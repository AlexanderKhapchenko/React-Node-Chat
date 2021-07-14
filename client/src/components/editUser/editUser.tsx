import { ChangeEvent } from "react";
import "./editUser.css"
import { useHistory, useLocation } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../redux/userActions";

export default function EditUser () {

	const location: any = useLocation();
	const { id, name, email, password } = location.state;

	const dispatch = useDispatch();

	const history = useHistory();

	const [valueName, setValueName] = useState(name);
	const [valueEmail, setValueEmail] = useState(email);
	const [valuePassword, setValuePassword] = useState(password); 

	const onChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
		switch(type) {
			case 'name': 
				setValueName(e.target.value);
				break;
			case 'email': 
				setValueEmail(e.target.value);
				break;
			case 'password': 
				setValuePassword(e.target.value);
				break;
			default:
				alert('wrond identifier for input');
		}
	}

	const editUserHandler = () => {
		const user = {
			id,
			name: valueName,
			email: valueEmail,
			password: valuePassword
		}

		dispatch(editUser(user));
		
	}

	const close = () => {
		history.push(ROUTES.CHAT);
	}

	return (
		<>
			<h1 className="header">Edit Message</h1>
			<div className="edit-user-wrapper">
				<div className="modal">
					<input 
						type="text" 
						className="edit-user-input"
						value={valueName}
						onChange={(e) => onChange(e, 'name')}
						placeholder="name"
					/>
					<input 
						type="text" 
						className="edit-user-input"
						value={valueEmail}
						onChange={(e) => onChange(e, 'email')}
						placeholder="email"
					/>
					<input 
						type="password" 
						className="edit-user-input"
						value={valuePassword}
						onChange={(e) => onChange(e, 'password')}
						placeholder="password"
					/>
					<div className="edit-buttons">
						<button className="edit-user-button" onClick={editUserHandler}>edit</button>
						<button className="edit-user-close" onClick={close}>close</button>
					</div>
				</div>
			</div>
		</>
	);
	
}
