import { HttpClient } from './utils/HttpClient';

type ICreateIngredientParams = {
    name: string;
    emoji: string;
}

type IUpdateIngredientParams = {
    name: string;
    emoji: string;
}

class CategoriesService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async getIngredientById(id: string) {
		const response = await this.httpClient.get(`/ingredients/${id}`);

		return response;
	}

	async getIngredients() {
		const response = await this.httpClient.get('/ingredients', {
			next: {
				tags: ['ingredients']
			}
		});

		return response;
	}

	async createIngredient(ingredient: ICreateIngredientParams) {
		const response = await this.httpClient.post('/ingredients', {
			body: JSON.stringify(ingredient)
		});

		return response;
	}

	async updateIngredient(id: string, ingredient: IUpdateIngredientParams) {
		const response = await this.httpClient.put(`/ingredients/${id}`, {
			body: JSON.stringify(ingredient),
		});

		return response;
	}

	async removeIngredient(id: string) {
		await this.httpClient.delete(`/ingredients/${id}`);
	}
}

export default new CategoriesService();
