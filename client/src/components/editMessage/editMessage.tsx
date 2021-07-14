import { ChangeEvent } from "react";
import "./editMessage.css"
import { useHistory, useLocation } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {editMessage} from '../../redux/chatActions';

export default function EditMessage () {

	const location: any = useLocation();
	const dispatch = useDispatch();

	const messageId = location.state.id;
	const messageText = location.state.text;

	const history = useHistory();
	const [value, setValue] = useState(messageText);


	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	}

	const editMessageHandler = () => {
		const message = {
			text: value,
			id: messageId
		}

		dispatch(editMessage(message));
	}

	const close = () => {
		history.push(ROUTES.CHAT);
	}

	return (
		<>
			<h1 className="header">Edit Message</h1>
			<div className="edit-message-wrapper">
				<div className="modal">
					<textarea
						className="edit-message-input"
						value={value}
						onChange={onChange}
						>
					</textarea>
					<div className="edit-buttons">
						<button className="edit-message-button" onClick={editMessageHandler}>edit</button>
						<button className="edit-message-close" onClick={close}>close</button>
					</div>
				</div>
			</div>
		</>
	);
	
}
