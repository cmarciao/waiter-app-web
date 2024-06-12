import { Product } from '@/types/Product';
import { api } from './utils/api';

class ProductsService {
	async getProductById(id: string) {
		return api.get(`/products/${id}`);
	}

	async getProducts(): Promise<Product[]> {
		return api.get('/products', {
			next: {
				tags: ['products']
			},
		});
	}

	async createProduct(product: FormData) {
		return api.post('/products', {
			body: product
		});
	}

	async updateProduct(id: string, product: FormData) {
		return api.put(`/products/${id}`, {
			body: product,
		});
	}

	async removeProduct(id: string) {
		return api.delete(`/products/${id}`);
	}
}

export default new ProductsService();
