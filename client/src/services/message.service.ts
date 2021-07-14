import { Api } from '../api/api';

class Message {
	async getAll() {
		try {
			const response = await fetch(Api.MESSAGE);
			const data = await response.json();
				
			data.sort((first:IResponse,second:IResponse) => {
				const a = new Date(first.createdAt);
				const b = new Date(second.createdAt);
				return a.getTime()-b.getTime();
			});
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	getOne(id: string) {
		
	}

	async addMessage(message: IResponse) {
		try {
			const response = await fetch(Api.MESSAGE, {
				method: 'POST',
				body: JSON.stringify(message),
				headers: { "Content-Type": "application/json" }
			});
			return response.json();
		} catch (err) {
			console.log(err);
		}
	}

	async update(payload: IResponse) {
		try {
			const response = await fetch(`${Api.MESSAGE}/${payload.id}`, {
				method: 'PUT',
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json" }
			});

			return response.json();
		} catch (err) {
			console.log(err);
		}
	}

	async delete(id: string) {
		try {
			const response = await fetch(`${Api.MESSAGE}/${id}`, {
				method: 'DELETE'
			});

			const data = await response.json();
			console.log(data);
			return data;
		} catch (err) {
			console.log(err);
		}
	}
}


export { Message };