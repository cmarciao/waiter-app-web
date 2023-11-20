import { Order } from '@/types/Order';
import { httpClient } from '../httpClient';

type GetHistoricResponse = Order[];

export async function get(orderBy: string) {
	const response = await httpClient.get<GetHistoricResponse>(`/historic?orderBy=${orderBy}`);
	return response.data;
}
