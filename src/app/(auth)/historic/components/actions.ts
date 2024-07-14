'use server';

import { RedirectType, redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { APP_ROUTES } from '@/constants/app-routes';

import HistoricService from '@/services/HistoricService';
import OrdersService from '@/services/OrdersService';
import { httpTags } from '@/constants/http-tags';

export async function getHistoricById(id: string) {
	return OrdersService.getOrderById(id);
}

export async function createHistoric() {
	await HistoricService.createHistoric();

	revalidateTag(httpTags.orders);
	revalidateTag(httpTags.historic);
	
	redirect(APP_ROUTES.private.home, RedirectType.replace);
}

export async function removeHistoric(id: string) {
	await HistoricService.removeHistoric(id);

	revalidateTag(httpTags.historic);
	redirect(APP_ROUTES.private.historic);
}
