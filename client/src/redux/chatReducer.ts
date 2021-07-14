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
});

export default chatReducer;