import { Component } from "react";
import Message from '../message/message';
import OwnMessage from '../ownMessage/ownMessage';
import './messageList.css';

const Skeleton  = require('react-loading-skeleton');

interface Props {
	list: Array<IResponse>
	currentUserId: string
	editMessage: (message: IResponse) => void
	deleteMessage: (message: IResponse) => void
}

class MessageList extends Component<Props> {
	render() {
		const {list, currentUserId} = this.props;
		return (
			<div className="message-list">
				{
					!list ?
				(
					<>
						<Skeleton count={4} width={640} height={600} className="mb-5"/>
					</>
				)
				:
				(list.map(message => {
					return message.userId === currentUserId 
							? <OwnMessage key={`${message.id}`} message={message} editMessage={this.props.editMessage} deleteMessage={this.props.deleteMessage}/> 
							: <Message key={`${message.id}`} message={message}/>
				}))
				}
			</div>
		)
	}
}

export default MessageList;
