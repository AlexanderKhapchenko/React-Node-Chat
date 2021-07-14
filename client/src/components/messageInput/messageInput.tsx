import { ChangeEvent } from "react";
import User from '../../user';
import './messageInput.css';
import { useDispatch } from 'react-redux';
import {addMessage} from '../../redux/chatActions';
import { useState } from "react";

function MessageInput() {
	const [inputMessage, setInputMessage] = useState('');
	const dispatch = useDispatch();

	const handleClick = () => {
		if(inputMessage.trim() === '') {
			return alert('Message can`t be empty');
		}

		const message = {
			avatar: User.avatar,
			text: inputMessage,
			user: User.name,
			userId: User.id
		}

		dispatch(addMessage(message));
		setInputMessage('');
	
	}

	const onChange = (e:ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputMessage(value);
	}

	return (
		<div className="message-input">
			<div>
				<input className="message-input-text" type="text" placeholder="Message" value={inputMessage} onChange={e => onChange(e)}/>
				<label className="message-input-label">Message</label>
			</div>
			<button className="message-input-button" onClick={handleClick}>Send</button>
		</div>
	)
}

export default MessageInput;
