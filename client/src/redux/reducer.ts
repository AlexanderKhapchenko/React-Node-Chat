

import {LOAD_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, SHOW_PRELOADER, HIDE_PRELOADER, SHOW_EDIT_MODAL, HIDE_EDIT_MODAL} from './action-types';
import { combineReducers } from "redux";

const initialState: IChatState = {
	messages: [],
	editModal: false,
  preloader: true,
	messageToEdit: null		
};


function chatReducer (state = initialState, action: IAction & IMessagesAction ): IChatState {
	
	switch (action.type) {
		case LOAD_MESSAGES: {
			const { messages } = action.payload!;

			return {
				...state,
				messages
			};
		}
		case ADD_MESSAGE: {
			const { message } = action.payload!;

			return {
				...state,
				messages: [...state.messages, message]
			};
		}

		case DELETE_MESSAGE: {
			const { message } = action.payload!;
			const messages = state.messages.filter((msg: IResponse) => msg.id !== message.id)

			return {
				...state,
				messages
			};
		}

		case UPDATE_MESSAGE: {
			const { message } = action.payload!;
			const messages = state.messages.map((el: IResponse) => {
				return message.id === el.id ? message : el
			});

			return {
				...state,
				messages
			};
		}

		case SHOW_PRELOADER:{
			return {
				...state,
				preloader: true
			};
		}

		case HIDE_PRELOADER:{
			return {
				...state,
				preloader: false
			};
		}

		case SHOW_EDIT_MODAL:{
			const { message } = action.payload!
			return {
				...state,
				editModal: true,
				messageToEdit: message
			};
		}

		case HIDE_EDIT_MODAL:{
			return {
				...state,
				editModal: false,
				messageToEdit: null
			};
		}

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	chat: chatReducer,
});

export default rootReducer;