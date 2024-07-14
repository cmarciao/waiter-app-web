'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import OrdersService from '@/services/OrdersService';

import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';
import { ORDER_STATES } from '@/constants/order-states';

export async function getOrders() {
	return OrdersService.getOrders();
}

export async function getOrderById(id: string) {
	return OrdersService.getOrderById(id);
}

export async function updateOrderStatus(id: string, state: ORDER_STATES) {
	await OrdersService.updateOrderStatus(id, state);

	revalidateTag(httpTags.orders);
	redirect(APP_ROUTES.private.home);
}

export async function removeOrder(id: string) {
	await OrdersService.removeOrder(id);

	revalidateTag(httpTags.orders);
	redirect(APP_ROUTES.private.home);
}
