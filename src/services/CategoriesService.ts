import { api } from './utils/api';

type ICreateCategoryParams = {
    emoji: string;
    name: string;
}

type IUpdateProductParams = {
    emoji: string;
    name: string;
}

class CategoriesService {
	async getCategoryById(id: string) {
		return api.get(`/categories/${id}`);
	}


	async getCategories()  {
		return api.get('/categories', {
			next: {
				tags: ['categories']
			}
		});
	}

	async createCategory(category: ICreateCategoryParams) {
		return api.post('/categories', {
			body: JSON.stringify(category),
		});
	}

	async updateCategory(id: string, category: IUpdateProductParams) {
		return api.put(`/categories/${id}`, {
			body: JSON.stringify(category)
		});
	}

	async removeCategory(id: string) {
		return api.delete(`/categories/${id}`);
	}

}

export default new CategoriesService();
