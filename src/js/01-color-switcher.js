// Оголошуємо змінні та знаходимо елементи з DOM
const body = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let bgColorChangeInterval = null;

// Додаємо обробники подій click до кнопок
btnStart.addEventListener('click', onStartBtnClick);
btnStop.addEventListener('click', onStopBtnClick);

// Робимо неактивність кнопки Stop
btnStop.setAttribute('disabled', true);

// Задаэмо інтервал зміни кольора body
function onStartBtnClick() {
  bgColorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  // Робимо активність/неактивність кнопок Start/Stop
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

// Зупинка зміни кольора фону
function onStopBtnClick() {
  clearInterval(bgColorChangeInterval);

  // Робимо активність/неактивність кнопок Start/Stop
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}

// Генеруємо випадковий кольор
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
