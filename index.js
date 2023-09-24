import { fetchData } from "./fetch.js";
import { renderMain } from "./renderMain.js";

console.log('started');

const currentDate = new Date();
const ArrayWeekDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

//-------------------------------------------------------------------------------------------------------
//* -- отрисовываем панель навигации <nav></nav>
for (let i = 0; i < 7; i++) {
	
	const innerHTML = `
	<a class="page-nav__day" href="#">
		<span class="page-nav__day-week">${ArrayWeekDayNames[i]}</span>
		<span class="page-nav__day-number">${new Date(currentDate.getTime() + 86400000*i).getDate()}</span>
	</a>`;

	document.querySelector('nav').insertAdjacentHTML('beforeend', innerHTML);
}
//-------------------------------------------------------------------------------------------------------
const pageNavDays = [...document.querySelectorAll('.page-nav__day')];

// -- добавим классы текущему дню
['page-nav__day_today','page-nav__day_chosen'].map(cl => pageNavDays[0].classList.add(cl));

// -- добавим специальный класс уикенду
pageNavDays[5].classList.add('page-nav__day_weekend');
pageNavDays[6].classList.add('page-nav__day_weekend');

//-------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
//* -- обработчик клика по панели навигации
const checkoutDay = (item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();

		// -- извлекаем дату, на которую кликнул юзер в панели навигации
		const targetDay = item.querySelector('.page-nav__day-number').innerText;
		const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(targetDay));

		// -- отрисовка блока main 
		document.querySelector('main').innerHTML = '';
		fetchData('event=update').then(data => {
			renderMain(data, targetDate);
		})

		pageNavDays.forEach(day => day.classList.remove('page-nav__day_chosen'));
		e.target.closest('.page-nav__day').classList.add('page-nav__day_chosen');
	})
}
pageNavDays.forEach(checkoutDay);
//*-------------------------------------------------------------------------------------------



//* -- отрисовка блока main ------------------------------------------------------------------
fetchData('event=update').then(data => {
	const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
	renderMain(data, today);
	//console.log(data)
});
//*-------------------------------------------------------------------------------------------

document.querySelector('main').addEventListener('click', e => {
	const seanceData = {
		timestamp: e.target.dataset.absoluteSeanceStart,
		hallId: e.target.dataset.hallId,
		seanceId: e.target.dataset.seanceId,
		filmName: e.target.dataset.filmName,
		hallName: e.target.dataset.hallName,
		seanceTime: e.target.dataset.seanceTime,
		hallPriceStandart: e.target.dataset.hallPriceStandart,
		hallPriceVip: e.target.dataset.hallPriceVip,
	}
	window.localStorage.setItem('seanceData', JSON.stringify(seanceData));
	//console.log(e.target)
});




