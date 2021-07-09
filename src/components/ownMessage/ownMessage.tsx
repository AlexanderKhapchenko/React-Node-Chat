import { Component } from "react";
import './ownMessage.css';
import formatDate from '../../helpers/formater';
import { connect } from 'react-redux';
import {deleteMessage, showEditModal} from '../../redux/actions';

interface Props {
	message: IResponse
	messages: Array<IResponse>,
	editModal: boolean,
	showEditModal: (message: IResponse) => IAction2
	deleteMessage: (message: IResponse) => IAction
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
		const message = this.props.message;
		this.props.showEditModal(message);
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

const mapStateToProps = (state: IState) => {
	return {
		messages: state.chat.messages,
		editModal: state.chat.editModal
	}
};

const mapDispatchToProps = {
	deleteMessage,
	showEditModal
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnMessage);