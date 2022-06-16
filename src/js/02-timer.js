import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const inputDateEl = document.querySelector('#datetime-picker')
const startBtnEl = document.querySelector('button[data-start]')
startBtnEl.disabled = true

const dataDaysEl = document.querySelector('span[data-days]')
const dataHoursEl = document.querySelector('span[data-hours]')
const dataMinutesEl = document.querySelector('span[data-minutes]')
const dataSecondsEl = document.querySelector('span[data-seconds]')

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

function addLeadingZero({days, hours, minutes, seconds}) {
    if(days < 10) {
        dataDaysEl.textContent = String(days).padStart(2, '0')
    } else {dataDaysEl.textContent = days}
    if(hours < 10) {
        dataHoursEl.textContent = String(hours).padStart(2, '0')
    } else {dataHoursEl.textContent = hours}
    if(minutes < 10) {
        dataMinutesEl.textContent = String(minutes).padStart(2, '0')
    } else {dataMinutesEl.textContent = minutes}
    if(seconds < 10) {
        dataSecondsEl.textContent = String(seconds).padStart(2, '0')
    } else {dataSecondsEl.textContent = seconds}
    
}

let intervalId = null;
function addInterval () {
    Loading.hourglass('', {
        backgroundColor: 'transparent',
        cssAnimationDuration: 1000
        });
    Report.success(
        'Date selected correctly',
        'Timer started',
        'Okay',
        );
    startBtnEl.disabled = true
    intervalId = setInterval(() => {
    selectedDate -= 1000
    if(selectedDate < 0) {
        clearInterval(intervalId)
        Loading.remove()
        return
    }
    addLeadingZero(convertMs(selectedDate))
}, 1000)}

let selectedDate = null 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] > new Date()) {
        startBtnEl.disabled = false
        let differenceMs = selectedDates[0].getTime() - new Date().getTime()
        selectedDate = differenceMs;
    } else {
        startBtnEl.disabled = true
        Report.failure(
            'Wrong date',
            "Please choose a date in the future",
            'Okay',
            );
      }
    },
  };

flatpickr(inputDateEl, options);

startBtnEl.addEventListener('click', addInterval)

