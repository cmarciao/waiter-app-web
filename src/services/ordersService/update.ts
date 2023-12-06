import { ORDER_STATES } from '@/constants/order-states';
import { httpClient } from '../httpClient';

type UpdateOrderParams =  {
	id: string;
	state: ORDER_STATES;
}

export async function update({ id, state }: UpdateOrderParams) {
	const { data } = await httpClient.patch(`/orders/${id}`, { state });
	return data;
}
