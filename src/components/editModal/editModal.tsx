import { ChangeEvent, Component } from "react";
import "./editModal.css"
import { connect } from 'react-redux';
import {hideEditModal, updateMessage} from '../../redux/actions';

interface Props {
	hideEditModal: () => IAction2
	updateMessage: (message: IResponse) => IAction
	messages: Array<IResponse>
	editModal: boolean
	messageToEdit: IResponse
}

class EditModal extends Component<Props> {

	state = {
		value: '',
		isEditing: false
	}

	onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		this.setState({
			value,
			isEditing: true
		})
	}

	editMessage = () => {
		this.clearState();

		this.props.updateMessage({
			...this.props.messageToEdit,
			text: this.state.value!
		});
		
		this.props.hideEditModal();
	}

	close = () => {
		this.clearState();
		this.props.hideEditModal();
	}

	clearState = () => {
		this.setState({
			isEditing: false,
			value: ''
		})
	}


	render() {
		return (
			<div className={`edit-message-modal ${this.props.editModal ? "modal-shown" : null}`}>
				<div className="modal">
					{/* <input type="text" className="edit-message-input" value={this.state.isEditing ? this.state.value : this.props.messageToEdit?.text} onChange={e => this.onChange(e)}/> */}
					<textarea className="edit-message-input" value={this.state.isEditing ? this.state.value : this.props.messageToEdit?.text} onChange={e => this.onChange(e)}>

					</textarea>
					<div className="edit-buttons">
						<button className="edit-message-button" onClick={this.editMessage}>edit</button>
						<button className="edit-message-close" onClick={this.close}>close</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		messages: state.messages,
		editModal: state.editModal,
		messageToEdit: state.messageToEdit
	}
};

const mapDispatchToProps = {
	updateMessage,
	hideEditModal
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);