'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import HistoricService from '@/services/HistoricService';
import OrdersService from '@/services/OrdersService';

export async function getHistoricById(id: string) {
	const response = await OrdersService.getOrderById(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function createHistoric() {
	const response = await HistoricService.createHistoric();

	if(response?.error) {
		throw new Error(response.message);
	}

	revalidateTag('orders');
	revalidateTag('historic');
	redirect('/home');
}

export async function removeHistoric(id: string) {
	await HistoricService.removeHistoric(id);

	revalidateTag('historic');
	redirect('/historic');
}
