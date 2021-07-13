import { Component } from "react";
import { connect } from 'react-redux';
import Header from '../header/header';
import MessageInput from "../messageInput/messageInput";
import MessageList from '../messageList/messageList';
import User from '../../user';
import EditModal from '../editModal/editModal';
import './chat.css'
import {loadMessages, showEditModal} from '../../redux/actions';

interface Props {
	url: string,
	loadMessages: (messages: Array<IResponse>) => IMessagesAction,
	messages: Array<IResponse>,
	showEditModal: (message: IResponse) => Omit<IAction, 'payload'>,
	editModal: boolean
}

class Chat extends Component<Props> {

	getLastMessageTime = (data: Array<IResponse>) => {
		const lastMessageDate = data[data.length - 1]?.createdAt;
		return lastMessageDate;
	}

	getUsersCount = (data: Array<IResponse>) => {
		const users = new Set();
		data.forEach( (element: IResponse) => {
			users.add(element.userId);
		});
		return users.size;
	}

	async componentDidMount() {
		try	{
			const response = await fetch(this.props.url);
			const data = await response.json();
			
			data.sort((first:IResponse,second:IResponse) => {
				const a = new Date(first.createdAt);
				const b = new Date(second.createdAt);
				return a.getTime()-b.getTime();
				});

			this.props.loadMessages(data);

			document.addEventListener('keydown', (event) => {
				if(event.code === 'ArrowUp' && !this.props.editModal) {
					const currentUserMessages = this.props.messages.filter((msg: IResponse) => msg.userId === User.id);
					const lastMessage = currentUserMessages[currentUserMessages.length - 1];

					(currentUserMessages.length !== 0) && this.props.showEditModal(lastMessage);
				}
			});
			
		} catch (error) {
			alert(error);
		}
	}

	render() {
		return (
			<div className="chat">
					<Header
						title = 'My chat'
						usersCount = {this.getUsersCount(this.props.messages)}
						messagesCount = {this.props.messages.length}
						lastMessageDate = {this.getLastMessageTime(this.props.messages)}
					/>
					<MessageList
						messages={this.props.messages}
						currentUserId={User.id}
					/>
					<MessageInput/>
					<EditModal/>
			</div>
		);
	}
}

const mapStateToProps = (state: IState) => {
	return {
		messages: state.chat.messages,
		editModal: state.chat.editModal,
	}
};

const mapDispatchToProps = {
	loadMessages,
	showEditModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);