import { HttpClient } from './utils/HttpClient';

type ICreateCategoryParams = {
    emoji: string;
    name: string;
}

type IUpdateProductParams = {
    emoji: string;
    name: string;
}

class CategoriesService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async getCategoryById(id: string) {
		const response = await this.httpClient.get(`/categories/${id}`);

		return response;
	}


	async getCategories()  {
		const response = await this.httpClient.get('/categories', {
			next: {
				tags: ['categories']
			}
		});

		return response;
	}

	async createCategory(category: ICreateCategoryParams) {
		const response = await this.httpClient.post('/categories', {
			body: JSON.stringify(category),
		});

		return response;
	}

	async updateCategory(id: string, category: IUpdateProductParams) {
		const response = await this.httpClient.put(`/categories/${id}`, {
			body: JSON.stringify(category)
		});

		return response;
	}

	async removeCategory(id: string) {
		await this.httpClient.delete(`/categories/${id}`);
	}

}

export default new CategoriesService();
