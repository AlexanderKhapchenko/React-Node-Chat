import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserActionType } from './action-types';


export const loadUsers = createAsyncThunk(UserActionType.LOAD_USERS, async (_args, { extra }: any) => ({
	users: await extra.userService.getAll()
}));

export const addUser = createAsyncThunk(UserActionType.ADD_USER, async (payload: any, { extra }: any) => ({
	users: await extra.userService.addUser(payload)
}));

export const deleteUser = createAsyncThunk(UserActionType.DELETE_USER, async (id: string, { extra }: any) => ({
	user: await extra.userService.delete(id)
}));

export const editUser = createAsyncThunk(UserActionType.EDIT_USER, async (payload: any, { extra }: any) => ({
	user: await extra.userService.update(payload)
}));
