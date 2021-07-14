

//import {LOAD_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, SHOW_PRELOADER, HIDE_PRELOADER, SHOW_EDIT_MODAL, HIDE_EDIT_MODAL} from './action-types';
//import { combineReducers } from "redux";
import { createReducer } from '@reduxjs/toolkit';
import { addMessage, loadMessages, deleteMessage, editMessage } from './chatActions';

const DataStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState: IChatState = {
	messages: [],
	editModal: false,
  preloader: true,
	messageToEdit: null,
	status: DataStatus.IDLE	
};

const chatReducer = createReducer(initialState, (builder) => {
	builder.addCase(loadMessages.pending, (state) => {
		state.status = DataStatus.PENDING;
	});
	
	builder.addCase(loadMessages.fulfilled, (state, { payload }) => {
		const { messages } = payload;

		state.messages = messages;
		state.status = DataStatus.SUCCESS;
	})

	builder.addCase(addMessage.fulfilled, (state, { payload }: any) => {
    const { message } = payload;

    state.messages = state.messages.concat(message);
  });

	builder.addCase(deleteMessage.fulfilled, (state, { payload }: any) => {
    const { message } = payload;

    state.messages = state.messages.filter(msg => message.id !== msg.id);
  });

	builder.addCase(editMessage.fulfilled, (state, { payload }: any) => {
    const { message } = payload;
    state.messages = state.messages.map(msg => {
			if(msg.id === message.id)
				return message;
			else 
				return msg;
		});
  });
	


	// switch (action.type) {
	// 	case LOAD_MESSAGES: {
	// 		const { messages } = action.payload!;

	// 		return {
	// 			...state,
	// 			messages
	// 		};
	// 	}
	// 	case ADD_MESSAGE: {
	// 		const { message } = action.payload!;

	// 		return {
	// 			...state,
	// 			messages: [...state.messages, message]
	// 		};
	// 	}

	// 	case DELETE_MESSAGE: {
	// 		const { message } = action.payload!;
	// 		const messages = state.messages.filter((msg: IResponse) => msg.id !== message.id)

	// 		return {
	// 			...state,
	// 			messages
	// 		};
	// 	}

	// 	case UPDATE_MESSAGE: {
	// 		const { message } = action.payload!;
	// 		const messages = state.messages.map((el: IResponse) => {
	// 			return message.id === el.id ? message : el
	// 		});

	// 		return {
	// 			...state,
	// 			messages
	// 		};
	// 	}

	// 	case SHOW_PRELOADER:{
	// 		return {
	// 			...state,
	// 			preloader: true
	// 		};
	// 	}

	// 	case HIDE_PRELOADER:{
	// 		return {
	// 			...state,
	// 			preloader: false
	// 		};
	// 	}

	// 	case SHOW_EDIT_MODAL:{
	// 		const { message } = action.payload!
	// 		return {
	// 			...state,
	// 			editModal: true,
	// 			messageToEdit: message
	// 		};
	// 	}

	// 	case HIDE_EDIT_MODAL:{
	// 		return {
	// 			...state,
	// 			editModal: false,
	// 			messageToEdit: null
	// 		};
	// 	}

	// 	default:
	// 		return state;
	// }
});

// const rootReducer = combineReducers({
// 	chat: chatReducer,
// });

export default chatReducer;