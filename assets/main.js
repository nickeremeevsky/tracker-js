const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const goals = [
	{
		id: 1,
		img: '/assets/images/goal.svg',
		name: 'Почитать Библию',
		completed: [false, false, false, false, false, false, false]
	}
];

const getDayButton = ({ id }, isChecked, index, dayName) =>
	`<button class= "${
		isChecked ? 'checked' : ''
	}"  onclick="toggleGoal('${id}', '${index}')"><img src="/assets/images/check.svg" width="25" alt="check" /><span>${dayName}</span></button>`;

const toggleGoal = (goalId, index) => {
	const elem = document.querySelectorAll(
		`[data-id = '${goalId}'] .goal-plan button`
	);

	const countDays = goals.length * 7;
	const percentOneDay = 100 / countDays;

	const progressBarElem = document.querySelector('.progress-bar > div');
	const isChecked = elem[index].classList.contains('checked');

	if (isChecked) {
		elem[index].classList.remove('checked');
	} else {
		elem[index].classList.add('checked');
	}

	const currentPercent = +progressBarElem.textContent.replace('%', '');

	let percent = isChecked
		? currentPercent - percentOneDay
		: currentPercent + percentOneDay;

	if (percent > 98) percent = 100;
	progressBarElem.textContent = percent.toFixed(1) + '%';
	progressBarElem.style.width = percent + '%';
};

const getDaysOfWeekElement = goal => {
	return daysOfWeek
		.map((name, index) =>
			getDayButton(goal, goal.completed[index], index, name)
		)
		.join('');
};

const getGoalElement = goal =>
	`<div class="goal" data-id="${goal.id}"><div class="goal-header">
<img src='${goal.img}' width="80" alt="goal" />
<span class="font-semibold text-2xl">${
		goal.name
	}</span></div><div class="goal-plan">${getDaysOfWeekElement(
		goal
	)}</div></div>`;

const render = goals => {
	const goalContainer = document.querySelector('.goal-container');
	goalContainer.innerHTML = goals.map(goal => getGoalElement(goal)).join('');
};

render(goals);

const openForm = () => {
	document.querySelector('.form').classList.add('open');
};

const addNewGoal = () => {
	const inputElem = document.querySelector('.form input');
	const value = inputElem.value;
	if (!value) {
		alert('Это поле не должно оставаться пустым!');
		return;
	}
	goals.unshift({
		id: goals.length + 1,
		img: '/assets/images/goal.svg',
		name: value,
		completed: [false, false, false, false, false, false, false]
	});

	render(goals);

	document.querySelector('.form').classList.remove('open');
	inputElem.value = '';
};
