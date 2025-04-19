export function postRequest(url: string, data: FormData, headers: Record<string, string> = {}) {
	// Fetch request here
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				error: false
			});
		}, 2000);
	});
}