import { httpClient } from '../httpClient';
import { Order } from '@/types/Order';

type GetAllOrdersResponse = Order[];

export async function getAll() {
	const { data } = await httpClient.get<GetAllOrdersResponse>('/orders');
	return data;
}
