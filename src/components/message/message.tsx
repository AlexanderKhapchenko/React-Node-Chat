import { Component } from "react";
import formatDate from '../../helpers/formater';
import "./message.css"

interface Props {
	message: IResponse
}

class Message extends Component<Props> {
	
	state = {
		toggleLiked: false
	}

	handleToggleLiked = () => {
		this.setState({
			toggleLiked: !this.state.toggleLiked
		});
	}

	render() {
		const { avatar, createdAt, id, text, user } = this.props.message;
		const time = formatDate(new Date(createdAt));

		const { toggleLiked } = this.state;
		return (
			<div className="message" id={id}>
				<img src={avatar} alt="user-avater" className="message-user-avatar" />
				<div>
					<p className="message-user-name">{user}</p>
					<p className="message-text">{text}</p>
					<div className="message-time">{time}</div>
				</div>
				<svg
						onClick={this.handleToggleLiked}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						tabIndex={0}
						className={`heart ${toggleLiked ? 'message-liked' : 'message-like'}`}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
			</div>
		);
	}
}

export default Message;