import { ChangeEvent, Component } from "react";
import User from '../../user';
import './messageInput.css';
import { connect } from 'react-redux';
import {addMessage} from '../../redux/actions';


const { v4: uuidv4 } = require('uuid');

interface Props {
	addMessage: (message: IResponse) => IAction,
	editModal: boolean
}

class MessageInput extends Component<Props> {

	state = {
		inputMessage: ''
	}

	componentDidMount() {
		document.addEventListener('keydown', (event) => {
			if(event.code === 'Enter' && !this.props.editModal) {
				this.handleClick();
			}
		});
	}

	handleClick = () => {
		if(this.state.inputMessage.trim() === '') {
			return alert('Message can`t be empty');
		}

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

		this.props.addMessage(message);
		this.setState({
			inputMessage: ''
		});
	
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
					<input className="message-input-text" type="text" placeholder="Message" value={this.state.inputMessage} onChange={e => this.onChange(e)}/>
					<label className="message-input-label">Message</label>
				</div>
				<button className="message-input-button" onClick={this.handleClick}>Send</button>
			</div>
		)
	}
}

const mapStateToProps = (state: IState) => {
	return {
		editModal: state.chat.editModal
	}
};

const mapDispatchToProps = {
	addMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);
