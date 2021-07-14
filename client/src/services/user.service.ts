import { Api } from '../api/api';

class User {
	async getAll() {
		try {
			const response = await fetch(Api.USER);
			const data = await response.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	getOne(id: string) {

	}

	async addUser(user: any) {
		try {
			const response = await fetch(Api.USER, {
				method: 'POST',
				body: JSON.stringify(user),
				headers: { "Content-Type": "application/json" }
			});
			return response.json();
		} catch (err) {
			console.log(err);
		}
	}

	async update(payload: any) {
		try {
			const {id, ...other} = payload
			const response = await fetch(`${Api.USER}/${id}`, {
				method: 'PUT',
				body: JSON.stringify(other),
				headers: { "Content-Type": "application/json" }
			});

			return response.json();
		} catch (err) {
			console.log(err);
		}
	}

	async delete(id: string) {
		try {
			const response = await fetch(`${Api.USER}/${id}`, {
				method: 'DELETE'
			});

			const data = await response.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
}

export { User };