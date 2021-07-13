import { listenerCount } from "events";
import { Component } from "react";
import Message from '../message/message';
import OwnMessage from '../ownMessage/ownMessage';
import './messageList.css';

const Skeleton  = require('react-loading-skeleton');

interface Props {
	messages: Array<IResponse>
	currentUserId: string
}

class MessageList extends Component<Props> {
	renderMessages = () => {
		const {messages, currentUserId} = this.props;
		return messages.map(message => {
			return message.userId === currentUserId 
					? <OwnMessage key={`${message.id}`} message={message}/> 
					: <Message key={`${message.id}`} message={message}/>
		})
	}

	render() {
		return (
			<div className="message-list">
				{
					this.renderMessages()					
				}
			</div>
		)
	}
}

export default MessageList;
