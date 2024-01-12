import { Product } from '@/types/Product';
import { HttpClient } from './utils/HttpClient';

class ProductsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async getProductById(id: string) {
		const response = await this.httpClient.get(`/products/${id}`);

		return response;
	}

	async getProducts(): Promise<Product[]> {
		const response = await this.httpClient.get('/products', {
			next: {
				tags: ['products']
			},
		});

		return response;
	}

	async createProduct(product: FormData) {
		const response = await this.httpClient.post('/products', {
			body: product
		});

		return response;
	}

	async updateProduct(id: string, product: FormData) {
		const response = await this.httpClient.put(`/products/${id}`, {
			body: product,
		});

		return response;
	}

	async removeProduct(id: string) {
		await this.httpClient.delete(`/products/${id}`);
	}
}

export default new ProductsService();
