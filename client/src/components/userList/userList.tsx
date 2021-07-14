import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../redux/userActions";
import UserItem from './UserItem';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

function UserList () {
	const { users } = useSelector(({ user }: any) => ({
    users: user.users
  }));


	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

	const onCreate = () => {
		history.push(ROUTES.ADD_USER);
	}

	console.log('users', users)

	return (
		<div className="message-list">
			{
				users.map((user: IUser) => {
					return  <UserItem 
										id={user.id}
										name={user.name}
										email={user.email}
										password={user.password}
									/> 
			})				
			}
			<button className="edit-user-close" onClick={onCreate}>Create New</button>
		</div>
	)
	
}

export default UserList;