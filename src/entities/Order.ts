import { Product } from './Product';

type ProductOrder = Product & {
	count: number;
}

export interface Order {
	id: string;
	table: number;
	orderState: string;
	total: number;
	createdAt: Date;
	products: ProductOrder[];
}
