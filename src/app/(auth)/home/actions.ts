'use server';

import { createHistoricService } from '@/services/temp/HistoricService';

export async function createHistoric() {
	const response = await createHistoricService();

	if(response?.error) {
		throw new Error(response.message);
	}

	return response;
}
