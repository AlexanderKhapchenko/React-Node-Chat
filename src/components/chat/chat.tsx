import { Component } from "react";
import Header from '../header/header';
import MessageInput from "../messageInput/messageInput";
import MessageList from '../messageList/messageList';
import User from '../../user';
import './chat.css'

interface Props {
	url: string
}

class Chat extends Component<Props> {

	state = {
		isPageLoad: false,
		lastMessageTime: '',
		messageCount: 0,
		userCount: 0,
		messages: []
	}

	getLastMessageTime = (data: Array<IResponse>) => {
		const lastMessageDate = data[data.length - 1].createdAt;
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

			this.setState({
				isPageLoad: true,
				lastMessageTime: this.getLastMessageTime(data),
				messageCount: data.length,
				userCount: this.getUsersCount(data),
				messages: data
			})
		}
		catch (error) {
			alert('Something wrong');
		}
	}

	sendMessage = (message: IResponse) => {
		this.setState({
			messages: [...this.state.messages, message],
			messageCount: (this.state.messageCount + 1),
			lastMessageTime: message.createdAt
		});
	}

	editMessage = (editedMessage: IResponse) => {
    const messages = this.state.messages.map((message: IResponse) => {
      return editedMessage.id === message.id ? editedMessage : message
    })

    this.setState({
      messages
    });
  }
  
  deleteMessage = (deletedMessage: IResponse) => {
    const messages = this.state.messages.filter((message: IResponse) => {
      return deletedMessage.id !== message.id
    })

    this.setState({
      messages,
			messageCount: (this.state.messageCount - 1),
			lastMessageTime: this.getLastMessageTime(messages),
    });
  }

	render() {
		return (
			<div className="chat">
					<Header
						title = 'My chat'
						usersCount = {this.state.userCount}
						messagesCount = {this.state.messageCount}
						lastMessageDate = {this.state.lastMessageTime}
					/>
					<MessageList
						list={this.state.messages}
						currentUserId={User.id}
						editMessage={this.editMessage} 
						deleteMessage={this.deleteMessage}
					/>
					<MessageInput sendMessage={this.sendMessage} />
			</div>
		);
	}
}

export default Chat;