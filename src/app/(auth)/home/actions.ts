'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import OrdersService from '@/services/OrdersService';

import { APIError } from '@/errors/APIError';
import { httpTags } from '@/constants/http-tags';
import { APP_ROUTES } from '@/constants/app-routes';
import { ORDER_STATES } from '@/constants/order-states';

export async function getOrders() {
	try {
		return OrdersService.getOrders();
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function getOrderById(id: string) {
	try {
		return OrdersService.getOrderById(id);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}
}

export async function updateOrderStatus(id: string, state: ORDER_STATES) {
	try {
		await OrdersService.updateOrderStatus(id, state);

		revalidateTag(httpTags.orders);
	} catch (e) {
		const apiError = e as APIError;
		throw new Error(apiError.message);
	}

	redirect(APP_ROUTES.private.home);
}

export async function removeOrder(id: string) {
	try {
		await OrdersService.removeOrder(id);

		revalidateTag(httpTags.orders);
	} catch (e) {
		const error = e as Error;
		throw new Error(error.message);
	}

	redirect(APP_ROUTES.private.home);
}
