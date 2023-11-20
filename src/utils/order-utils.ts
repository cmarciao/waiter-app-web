import { Order } from '@/types/Order';

export function generateOrderName(order: Order) {
	const productsNameList = order.products.map(product => product.name);
	const uniqueProductsName = new Set(productsNameList);
	const newProductsNameList = Array.from(uniqueProductsName);
	const orderName = newProductsNameList.join(', ');

	return orderName;
}

export function generateOrderCategoryName(order: Order) {
	const categoriesList = order.products.map(product => product.category);
	const categoriesNameList = categoriesList.map(category => `${category.emoji} ${category.name}`);
	const uniqueCategoriesName = new Set(categoriesNameList);
	const newCategoriesNameList = Array.from(uniqueCategoriesName);
	const orderCategoryName = newCategoriesNameList.join(', ');

	return orderCategoryName;
}
