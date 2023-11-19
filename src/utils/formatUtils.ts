export function formatPrice(price: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(price);
}

export function formatDate(date: Date) {
	return Intl.DateTimeFormat('pt-BR').format(date);
}
