import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import MessageInput from "../messageInput/messageInput";
import MessageList from '../messageList/messageList';
import Login from '../login/login';
import User from '../../user';
import EditMessage from '../editMessage/editMessage';
import UserList from '../userList/userList'
import EditUser from '../editUser/editUser'
import './chat.css';
import {loadMessages} from '../../redux/chatActions';
import { useEffect } from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddUser from '../addUser/addUser';

export default function Chat() {

	const { messages } = useSelector(({ chat }: any) => ({
    messages: chat.messages
  }));


	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(loadMessages());
  }, [dispatch]);

	const getLastMessageTime = (data: Array<IResponse>) => {
		const lastMessageDate = data[data.length - 1]?.createdAt;
		return lastMessageDate;
	}

	const getUsersCount = (data: Array<IResponse>) => {
		const users = new Set();
		data.forEach( (element: IResponse) => {
			users.add(element.userId);
		});
		return users.size;
	}

			// 	document.addEventListener('keydown', (event) => {
			// 	if(event.code === 'ArrowUp' && !this.props.editModal) {
			// 		const currentUserMessages = this.props.messages.filter((msg: IResponse) => msg.userId === User.id);
			// 		const lastMessage = currentUserMessages[currentUserMessages.length - 1];

			// 		(currentUserMessages.length !== 0) && this.props.showEditModal(lastMessage);
			// 	}
			// });

	return (
		<div className="chat">
			<Router>
				<Switch>
					<Route path={ROUTES.CHAT} exact>
						<Header
							title = 'My chat'
							usersCount = {getUsersCount(messages)}
							messagesCount = {messages.length}
							lastMessageDate = {getLastMessageTime(messages)}
						/>
						<MessageList
							messages={messages}
							currentUserId={User.id}
						/>
						<MessageInput/>
						<Link to={ROUTES.USER_LIST}>
							USER LIST
						</Link>
					</Route>

					<Route path={ROUTES.LOGIN}>
					  <Login/>
					</Route>

					<Route path={ROUTES.EDIT_MESSAGE}>
						<EditMessage/>
					</Route>

					<Route path={ROUTES.USER_LIST}>
						<UserList/>
					</Route>

					<Route path={ROUTES.EDIT_USER}>
						<EditUser/>
					</Route>

					<Route path={ROUTES.ADD_USER}>
						<AddUser/>
					</Route>

				</Switch>
			</Router>
		</div>
	);
	
}
