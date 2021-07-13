import {LOAD_MESSAGES, ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, SHOW_PRELOADER, HIDE_PRELOADER, SHOW_EDIT_MODAL, HIDE_EDIT_MODAL} from './action-types';

export const loadMessages = (messages: IResponse[]) => ({
	type: LOAD_MESSAGES,
	payload: {
		messages
	}
})

export const addMessage = (message: IResponse) => ({
	type: ADD_MESSAGE,
	payload: {
		message
	}
})

export const deleteMessage = (message: IResponse) => ({
	type: DELETE_MESSAGE,
	payload: {
		message
	}
})

export const updateMessage = (message: IResponse) => ({
	type: UPDATE_MESSAGE,
	payload: {
		message
	}
})

export const showPreloader = () => ({
	type: SHOW_PRELOADER
});

export const hidePreloader = () => ({
	type: HIDE_PRELOADER
});

export const showEditModal = (message: IResponse) => ({
	type: SHOW_EDIT_MODAL,
	payload: {
		message
	}
});

export const hideEditModal = () => ({
	type: HIDE_EDIT_MODAL
});