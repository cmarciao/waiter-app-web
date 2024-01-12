import { Order } from '@/types/Order';
import { HttpClient } from './utils/HttpClient';

class HistoricService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient('http://localhost:3333');
	}

	async createHistoric() {
		const response = await this.httpClient.post('/historic');

		return response;
	}

	async getHistoric(orderBy: string): Promise<Order[]> {
		const response = await this.httpClient.get(`/historic?orderBy=${orderBy}`, {
			next: {
				tags: ['historic']
			}
		});

		return response;
	}

	async removeHistoric(id: string): Promise<Order[]> {
		const response = await this.httpClient.delete(`/historic/${id}`);
		return response;
	}

}

export default new HistoricService();
