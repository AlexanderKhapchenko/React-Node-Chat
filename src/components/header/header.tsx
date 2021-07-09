import React, { Component } from "react";
import formatDate from '../../helpers/formater';
import './header.css'

interface Props {
	title: string,
	usersCount: number,
	messagesCount: number,
	lastMessageDate: string
}

class Header extends Component<Props> {

	render(){
		const { 
			title, 
			usersCount, 
			messagesCount, 
			lastMessageDate
		} = this.props;
		
		const time = formatDate(new Date(lastMessageDate));

		return (
			<header className="header">
				<h1 className="header-title">{title}</h1>
				<p className="header-users-count">{usersCount} participants</p>
				<p className="header-messages-count">{messagesCount} messages</p>
				<p className="header-last-message-date">last update message at {time}</p>
			</header>
		)
	}

}

export default Header;