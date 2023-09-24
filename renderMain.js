import { getMovieHTML } from "./getMovieHTML.js";

export function renderMain(data, targetDate) {
	// -- сохраним полученные с сервера данные
	window.localStorage.setItem('allData', JSON.stringify(data));
	
	data.films.result.forEach(element => {
		// -- вставим поэлементно информацию по каждому фильму внутрь main
		document.querySelector('main').insertAdjacentHTML('beforeend', getMovieHTML(element, targetDate));
	});
}