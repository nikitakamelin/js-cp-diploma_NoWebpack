const url = 'https://jscp-diplom.netoserver.ru/';

export const fetchData = (body) => 
	fetch(url, {
		method: 'POST',
		body: body,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded',
		},
	})
		.then(response => response.json())
	






