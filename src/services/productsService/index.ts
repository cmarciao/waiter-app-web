import { create } from './create';
import { getAll } from './getAll';
import { remove } from './remove';
import { update } from './update';

export const productsService = {
	getAll,
	create,
	update,
	remove
};
