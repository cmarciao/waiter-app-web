'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { ORDER_STATES } from '@/constants/order-states';
import OrdersService from '@/services/OrdersService';

export async function getOrders() {
	const response = await OrdersService.getOrders();

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function getOrderById(id: string) {
	const response = await OrdersService.getOrderById(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function updateOrderStatus(id: string, state: ORDER_STATES) {
	const response = await OrdersService.updateOrderStatus(id, state);

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('orders');
	redirect('/home');
}

export async function removeOrder(id: string) {
	try {
		await OrdersService.removeOrder(id);

		revalidateTag('orders');
		redirect('/home');
	} catch(e) {
		const error = e as Error;

		throw new Error(error.message);
	}
}
