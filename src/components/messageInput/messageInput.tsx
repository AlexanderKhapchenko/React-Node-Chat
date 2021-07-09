import { ChangeEvent, Component } from "react";
import User from '../../user';
import './messageInput.css';
const { v4: uuidv4 } = require('uuid');

interface Props {
	sendMessage: (message: IResponse) => void
}

class MessageInput extends Component<Props> {

	state = {
		inputMessage: ''
	}

	handleClick = () => {
		const now = new Date();
		const message: IResponse = {
			id: uuidv4(),
			createdAt: now.toISOString(),
			avatar: User.avatar,
			editedAt: '',
			text: this.state.inputMessage,
			user: User.name,
			userId: User.id
		}

		this.props.sendMessage(message);
	}

	onChange(e:ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		this.setState({
			inputMessage: value
		});
	}

	render() {
		return (
			<div className="message-input">
				<div>
					<input className="message-input-text" type="text" placeholder="Message" onChange={e => this.onChange(e)}/>
					<label className="message-input-label">Message</label>
				</div>
				<button className="message-input-button" onClick={this.handleClick}>Send</button>
			</div>
		)
	}
}

export default MessageInput;