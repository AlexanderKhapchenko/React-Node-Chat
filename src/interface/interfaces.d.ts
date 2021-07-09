interface IResponse {
	avatar: string,
	createdAt: string,
	editedAt: string,
	id: string,
	text: string,
	user: string,
	userId: string
}

interface IState {
	messages: Array<IResponse>,
	editModal: boolean,
  preloader: boolean,
	messageToEdit: null | IResponse		
}

interface IAction {
  type: string
  payload?: {
		message: IResponse
	}
}

interface IMessagesAction {
  type: string
  payload?: {
		messages: Array<IResponse>,
	}
}

interface IAction2 {
  type: string
}