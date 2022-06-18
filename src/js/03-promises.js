import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
const formEl = document.querySelector('.form')

formEl.addEventListener('submit', onSubmitForm)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
  }, delay)
  })
  
}

function onSubmitForm(event) {
  event.preventDefault()
  const {delay, step, amount} = event.target.elements
  let delayStep = Number(delay.value)

    for (let i = 1; i<= amount.value; i+=1) {
      createPromise(i, delayStep).then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delayStep += Number(step.value)
    }
  formEl.reset() 
}
