// Імпортуємо бібліотеку.
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

// Додаємо обробники подій
form.addEventListener('submit', onCreateBtnClick);

function onCreateBtnClick(e) {
  e.preventDefault();
  const formElements = e.currentTarget;
  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
  let amount = Number(formElements.amount.value);

  generatePromises(delay, step, amount);
  formElements.reset();
  Notiflix.Loading.circle('Promises are handling...');
  Notiflix.Loading.remove(delay + step * amount);
}

// Функція повертає один проміс, який виконується або відхиляється через delay часу.
function generatePromises(delay, step, amount) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

// Функція повертає проміс, який виконується або відхиляється після заданої затримки.
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
