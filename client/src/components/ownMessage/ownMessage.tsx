import './ownMessage.css';
import formatDate from '../../helpers/formater';
import { useDispatch } from 'react-redux';
import {deleteMessage} from '../../redux/chatActions';
import * as ROUTES from '../../constants/routes';
import { useHistory } from "react-router-dom";

interface Props {
	message: IResponse
}

function OwnMessage (props: Props) {

	const dispatch = useDispatch();
	const history = useHistory();

	const handleClickDelete = () => {
		dispatch(deleteMessage(props.message.id));
	}

	const handleClickEdit = () => {
		//history.push(`${ROUTES.EDIT_MESSAGE}/${id}`);
		history.push(ROUTES.EDIT_MESSAGE, {
			id,
			text
		});
	}

	const { avatar, createdAt, id, text, user } = props.message;
	const time = formatDate(new Date(createdAt));

	return (
		<div className="own-message" id={id}>
			<div className="message-buttons">
				<button className="message-edit" onClick={handleClickEdit}>Edit</button>
				<button className="message-delete" onClick={handleClickDelete}>Delete</button>
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

export default OwnMessage;
