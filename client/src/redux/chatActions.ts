import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './action-types';


export const loadMessages = createAsyncThunk(ActionType.LOAD_MESSAGES, async (_args, { extra }: any) => ({
	messages: await extra.messageService.getAll()
}));

export const addMessage = createAsyncThunk(ActionType.ADD_MESSAGE, async (payload: Omit<IResponse, 'id' | 'createdAt' | 'editedAt'>, { extra }: any) => ({
	message: await extra.messageService.addMessage(payload)
}));

export const deleteMessage = createAsyncThunk(ActionType.DELETE_MESSAGE, async (id: string, { extra }: any) => ({
	message: await extra.messageService.delete(id)
}));

export const editMessage = createAsyncThunk(ActionType.EDIT_MESSAGE, async (payload: any, { extra }: any) => ({
	message: await extra.messageService.update(payload)
}));
