export function delay(timeInMillis = 1000) {
	return new Promise((res) => setTimeout(res, timeInMillis));
}