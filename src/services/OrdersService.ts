import { ORDER_STATES } from '@/constants/order-states';
import { api } from './utils/api';

class OrdersService {
	async getOrderById(id: string) {
		return api.get(`/orders/${id}`);
	}

	async getOrders() {
		return api.get('/orders', {
			cache: 'no-store'
		});
	}

	async updateOrderStatus(id: string, state: ORDER_STATES) {
		return api.patch(`/orders/${id}`, {
			body: JSON.stringify({state})
		});
	}

	async removeOrder(id: string) {
		return api.delete(`/orders/${id}`);
	}
}

export default new OrdersService();
