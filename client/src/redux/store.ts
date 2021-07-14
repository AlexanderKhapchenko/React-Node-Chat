import chatReducer from "./chatReducer";
import userReducer from "./userReducer";
import { configureStore } from '@reduxjs/toolkit';
import { Message } from '../services/message.service';
import { User } from '../services/user.service';

const messageService = new Message();
const userService = new User();

export default configureStore({
  reducer: {
		chat: chatReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {
          messageService,
					userService
        },
      },
      serializableCheck: false,
    });
  }

})
