import {LOAD_MESSAGES} from './action-types';

export const loadMessages = (url: string) => (dispatch : any) => {
	fetch(url)
		.then(response => response.json())
		.then(messages => {
			messages.sort((first:IResponse,second:IResponse) => {
				const a = new Date(first.createdAt);
				const b = new Date(second.createdAt);
				return a.getTime()-b.getTime();
			});
		
			dispatch({
				type: LOAD_MESSAGES,
				payload: messages
			})
		})
}