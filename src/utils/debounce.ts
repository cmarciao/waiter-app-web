let timer: NodeJS.Timeout;

export function debounce(func: () => void, timeout = 300){
	clearTimeout(timer);
	
	timer = setTimeout(() => {
		func();
	}, timeout);
}