'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { getOrderByIdService } from '@/services/temp/OrdersService';
import { removeHistoricService } from '@/services/temp/HistoricService';

export async function getHistoricById(id: string) {
	const response = await getOrderByIdService(id);

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}

export async function removeHistoric(id: string) {
	await removeHistoricService(id);

	revalidateTag('historic');
	redirect('/historic');
}
