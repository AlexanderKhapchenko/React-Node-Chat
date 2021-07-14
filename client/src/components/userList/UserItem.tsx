import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from "../../redux/userActions";
import * as ROUTES from '../../constants/routes';


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
      <div className="container list-group-item">
          <div className="row">
              <div className="col-8">
                  <span className="badge badge-secondary float-left" style={{ fontSize: "2em", margin: "2px" }}>{name}</span>
                  <span className="badge badge-info" style={{ fontSize: "2em", margin: "2px" }}>{email}</span>
              </div>
              <div className="col-4 btn-group">
                  <button className="btn btn-outline-primary" onClick={(e) => onEdit(id)}> Edit </button>
                  <button className="btn btn-outline-dark" onClick={(e) => onDelete(id)}> Delete </button>
              </div>
          </div>
      </div>
  );

};