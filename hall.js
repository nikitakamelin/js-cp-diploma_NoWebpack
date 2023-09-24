import { fetchData } from "./fetch.js";

console.log('hall.js started');

// достаём сохраненные ранее данные о сеансе
const seanceData = JSON.parse(window.localStorage.getItem('seanceData'));
const hallConfig = window.localStorage.getItem('hallConfig')

// формируем тело запроса на сервер
const body = `event=get_hallConfig&timestamp=${Number(seanceData.timestamp)/1000}&hallId=${Number(seanceData.hallId)}&seanceId=${Number(seanceData.seanceId)}`;

let rowsList = [];
let selectedChairsList = [];
let selectedChairsListNumbers = [];
let ticket = [];


//*--------------------------------------------------------------------------------------------------------------------
fetchData(body).then(data => {
	if (!data) {
		data = hallConfig;
	}

	const hallHTML = `<section class="buying">
	<div class="buying__info">
		<div class="buying__info-description">
			<h2 class="buying__info-title">${seanceData.filmName}</h2>
			<p class="buying__info-start">Начало сеанса: ${seanceData.seanceTime}</p>
			<p class="buying__info-hall">${seanceData.hallName}</p>
		</div>
		<div class="buying__info-hint">
			<p>Тапните дважды,<br>чтобы увеличить</p>
		</div>
	</div>
	<div class="conf-step">
		<div class="conf-step__wrapper">
			${data}
		</div>
		<div class="conf-step__legend">
			<div class="col">
				<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_standart"></span>
					Свободно (<span class="conf-step__legend-value price-standart">${seanceData.hallPriceStandart}</span>руб)</p>
				<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_vip"></span>
					Свободно VIP (<span class="conf-step__legend-value price-vip">${seanceData.hallPriceVip}</span>руб)</p>
			</div>
			<div class="col">
				<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_taken"></span>
					Занято</p>
				<p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_selected"></span>
					Выбрано</p>
			</div>
		</div>
	</div>
	<button class="acceptin-button acceptin-button-disabled">Забронировать</button>
	</section>`;

	// вставляем HTML код в DOM
	document.querySelector('main').insertAdjacentHTML('beforeend', hallHTML);

	// массив рядов в разметке
	rowsList = [...document.querySelectorAll('.conf-step__row')];

})
//*--------------------------------------------------------------------------------------------------------------------




//* -- добавим событие клика при выборе места ----------------------
document.querySelector('main').addEventListener('click', e => {
	// так как в разметке есть элемент selected в легенде, нужно проверять, что нажали именно на ряд, который можно выбрать
	let rowPushed = e.target.closest('.conf-step__row')

	// выбрать место можно только в разметке
	if (rowPushed
		&& e.target.classList.contains('conf-step__chair') 
		&& !e.target.classList.contains('conf-step__chair_disabled')
		&& !e.target.classList.contains('conf-step__chair_taken')) {
		// устанавливаем соответствующий класс выбранному месту
		e.target.classList.toggle('conf-step__chair_selected');

		let chairsList = [...rowPushed.querySelectorAll('.conf-step__chair')];
		ticket = { row: rowsList.findIndex(row => row === rowPushed)+1, chair: chairsList.findIndex(col => col === e.target)+1};
		
		//item = [rowsList.findIndex(row => row === rowPushed)+1, chairsList.findIndex(col => col === e.target)+1]
		e.target.classList.contains('conf-step__chair_selected') ?
			selectedChairsListNumbers.push(ticket):
				console.log('удалить элемент:', 
					selectedChairsListNumbers.find(item => 
						item.row == rowsList.findIndex(row => row === rowPushed)+1 
						&& item.chair == chairsList.findIndex(col => col === e.target)+1)
				);
				
	
	}

	// сохраним массив с выбранными местами
	if (e.target.closest('.conf-step__wrapper')) {
		selectedChairsList = e.target.closest('.conf-step__wrapper').querySelectorAll('.conf-step__chair_selected');
	}
	const button = e.target.closest('main').querySelector('.acceptin-button')
	// если выбрано хотя бы одно место, разблокируем кнопку 'Забронировать')
	selectedChairsList.length > 0 ? button.classList.remove('acceptin-button-disabled'): button.classList.add('acceptin-button-disabled');

	//? ---------------------------------------------------------------------------

	console.log(selectedChairsListNumbers)
	//console.log([...new Set(selectedChairsListNumbers)])
	
})
//*--------------------------------------------------------------
//console.log(selectedChairsList);

