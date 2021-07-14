interface IResponse {
	avatar: string,
	createdAt: string,
	editedAt: string,
	id: string,
	text: string,
	user: string,
	userId: string
}

interface IChatState {
	messages: Array<IResponse>,
	editModal: boolean,
  preloader: boolean,
	messageToEdit: null | IResponse,
	status: string
}

interface IUserState {
	users: Array<IUser>,
	status: string
}

interface IState {
	chat: IChatState
}


interface IAction {
  type: string
  payload: {
		message: IResponse
	}
}

interface IMessagesAction {
  type: string
  payload: {
		messages: Array<IResponse>,
	}
}

interface IUser {
	name: string,
	password: string,
	email: string,
	id: string,
	role: string
}