// Імпортуємо бібліотеки
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/material_red.css');

// Робимо змінні та знаходимо елементи з DOM
const dateSelector = document.getElementById('datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysNum = document.querySelector('span[data-days]');
const hoursNum = document.querySelector('span[data-hours]');
const minutesNum = document.querySelector('span[data-minutes]');
const secondsNum = document.querySelector('span[data-seconds]');

let currentTime = new Date().getTime();
let selectedTime = 0;

// Вимикання кнопки
btnStart.disabled = true;

// Задаємо об'єкт з налаштуваннями для вибора дати та часу
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    checkDate();
  },
};

const fp = flatpickr(dateSelector, options);

// Додаємо обробники подій click
btnStart.addEventListener('click', onStartClick);

// Перевіряємо обрана дата більше поточного часу чи ні, та видаємо повідомлення.
function checkDate() {
  if (currentTime >= selectedTime) {
    Notiflix.Notify.failure('Please choose a date in the future!');
  } else {
    btnStart.disabled = false;
    Notiflix.Notify.success(
      'Correct date was set. Click START to begin countdown.'
    );
  }
}

// Запускає таймер при натасканні Старт.
function onStartClick() {
  const timer = setInterval(() => {
    btnStart.disabled = true;
    dateSelector.disabled = true;
    let remainingTime = convertMs(selectedTime - Date.now());

    if (remainingTime.seconds < 0) {
      clearInterval(timer);
      Notiflix.Report.success('Out of time!', 'Timer reached end.', 'OK');
      dateSelector.disabled = false;
    } else {
      renderTimer(remainingTime);
    }
  }, 1000);
}

// Додавання 0
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Відображення значень таймера
function renderTimer({ days, hours, minutes, seconds }) {
  daysNum.textContent = addLeadingZero(`${days}`);
  hoursNum.textContent = addLeadingZero(`${hours}`);
  minutesNum.textContent = addLeadingZero(`${minutes}`);
  secondsNum.textContent = addLeadingZero(`${seconds}`);
}

// Функція для підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
