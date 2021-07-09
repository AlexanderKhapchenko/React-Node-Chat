import { Component } from "react";
import User from '../../user';
import './ownMessage.css';
import formatDate from '../../helpers/formater';

interface Props {
	message: IResponse
	editMessage: (message: IResponse) => void
	deleteMessage: (message: IResponse) => void
}

class OwnMessage extends Component<Props> {
	state = {
		toggleLiked: false
	}

	handleToggleLiked = () => {
		this.setState({
			toggleLiked: !this.state.toggleLiked
		});
	}

	handleClickEdit = () => {
		const { avatar, createdAt, id, text, user } = this.props.message;
		const editedMessage = prompt(`Edit message ${text}`)  || '';
		this.props.editMessage({
			id,
			createdAt,
			avatar,
			editedAt: '',
			text: editedMessage,
			user,
			userId: User.id
		})
	}

	handleClickDelete = () => {
		const message = this.props.message;
		this.props.deleteMessage(message);
	}

	render() {
		const { avatar, createdAt, id, text, user } = this.props.message;
		const time = formatDate(new Date(createdAt));

		return (
			<div className="own-message" id={id}>
				<div className="message-buttons">
					<button className="message-edit" onClick={this.handleClickDelete}>Delete</button>
					<button className="message-delete" onClick={this.handleClickEdit}>Edit</button>
				</div>
				<div className="message-info">
					<p className="message-user-name">{user}</p>
					<p className="message-text">{text}</p>
					<div className="message-time">{time}</div>
				</div>
				<img src={avatar} alt="user-avater" className="message-user-avatar" />
			</div>
		);
	}
}

export default OwnMessage;