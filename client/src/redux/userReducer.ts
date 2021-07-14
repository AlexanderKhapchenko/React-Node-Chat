
import { createReducer } from '@reduxjs/toolkit';
import { addUser, loadUsers, deleteUser, editUser } from './userActions';

const DataStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState: IUserState = {
	users: [],
	status: ''
};

const userReducer = createReducer(initialState, (builder) => {
	builder.addCase(loadUsers.pending, (state) => {
		state.status = DataStatus.PENDING;
	});
	
	builder.addCase(loadUsers.fulfilled, (state, { payload }) => {
		const { users } = payload;

		state.users = users;
		state.status = DataStatus.SUCCESS;
	})

	builder.addCase(addUser.fulfilled, (state, { payload }: any) => {
    const { user } = payload;

    state.users = state.users.concat(user);
  });

	builder.addCase(deleteUser.fulfilled, (state, { payload }: any) => {
    const { user } = payload;

    state.users = state.users.filter(el => user.id !== el.id);
  });

	builder.addCase(editUser.fulfilled, (state, { payload }: any) => {
    const { user } = payload;
    state.users = state.users.map(el => {
			if(el.id === user.id)
				return user;
			else 
				return el;
		});
  });
	
});

export default userReducer;
