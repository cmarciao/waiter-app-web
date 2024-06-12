import { Order } from '@/types/Order';
import { api } from './utils/api';

class HistoricService {
	async createHistoric() {
		return api.post('/historic');
	}

	async getHistoric(orderBy: string): Promise<Order[]> {
		return api.get(`/historic?orderBy=${orderBy}`, {
			next: {
				tags: ['historic']
			}
		});
	}

	async removeHistoric(id: string): Promise<Order[]> {
		return api.delete(`/historic/${id}`);
	}
}

export default new HistoricService();
