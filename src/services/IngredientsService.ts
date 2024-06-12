import { api } from './utils/api';

type ICreateIngredientParams = {
    name: string;
    emoji: string;
}

type IUpdateIngredientParams = {
    name: string;
    emoji: string;
}

class CategoriesService {
	async getIngredientById(id: string) {
		return api.get(`/ingredients/${id}`);
	}

	async getIngredients() {
		return api.get('/ingredients', {
			next: {
				tags: ['ingredients']
			}
		});
	}

	async createIngredient(ingredient: ICreateIngredientParams) {
		return api.post('/ingredients', {
			body: JSON.stringify(ingredient)
		});
	}

	async updateIngredient(id: string, ingredient: IUpdateIngredientParams) {
		return api.put(`/ingredients/${id}`, {
			body: JSON.stringify(ingredient),
		});
	}

	async removeIngredient(id: string) {
		return api.delete(`/ingredients/${id}`);
	}
}

export default new CategoriesService();
