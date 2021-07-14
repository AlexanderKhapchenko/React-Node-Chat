import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from "../../redux/userActions";
import * as ROUTES from '../../constants/routes';
import './userItem.css';


interface Props {
	id: string,
	name: string,
	password: string,
	email: string
}

export default function UserItem (props: Props) {

	const dispatch = useDispatch();
	const history = useHistory();

	const onEdit = (id: string) => {
		history.push(ROUTES.EDIT_USER, {
			id,
			name,
			password,
			email
		});
	}

	const onDelete = (id: string) => {
		dispatch(deleteUser(id));
	}

  const { id, name, email, password } = props;
	
  return (
      <div className="users-container">
          <div className="user-info">
                  <span>{name}</span>
                  <span>{email}</span>
          </div>
          <div className="btn-container">
              <button className="edit-btn" onClick={(e) => onEdit(id)}> Edit </button>
              <button className="delete-btn" onClick={(e) => onDelete(id)}> Delete </button>
          </div>
      </div>
  );

};