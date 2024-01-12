import { ORDER_STATES } from '@/constants/order-states';
import { HttpClient } from './utils/HttpClient';

class OrdersService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async getOrderById(id: string) {
		const response = await this.httpClient.get(`/orders/${id}`);

		return response;
	}

	async getOrders() {
		const response = await this.httpClient.get('/orders', {
			next: {
				tags: ['orders']
			}
		});

		return response;
	}

	async updateOrderStatus(id: string, state: ORDER_STATES) {
		const response = await this.httpClient.patch(`/orders/${id}`, {
			body: JSON.stringify({state})
		});

		return response;
	}

	async removeOrder(id: string) {
		await this.httpClient.delete(`/orders/${id}`);
	}
}

export default new OrdersService();
