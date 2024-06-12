'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { APIError } from '@/errors/APIError';
import { APP_ROUTES } from '@/constants/app-routes';

import HistoricService from '@/services/HistoricService';
import OrdersService from '@/services/OrdersService';
import { httpTags } from '@/constants/http-tags';

export async function getHistoricById(id: string) {
	try {
		return OrdersService.getOrderById(id);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function createHistoric() {
	try {
		await HistoricService.createHistoric();

		revalidateTag(httpTags.orders);
		revalidateTag(httpTags.historic);

		redirect(APP_ROUTES.private.home);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function removeHistoric(id: string) {
	try {
		await HistoricService.removeHistoric(id);

		revalidateTag(httpTags.historic);
		redirect(APP_ROUTES.private.historic);
	} catch(e){
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}
