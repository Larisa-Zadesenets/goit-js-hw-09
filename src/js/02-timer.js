import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimeInputEl = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');
const refs = {
  days: timerEl.querySelector('[data-days]'),
  hours: timerEl.querySelector('[data-hours]'),
  minutes: timerEl.querySelector('[data-minutes]'),
  seconds: timerEl.querySelector('[data-seconds]'),
};

let selectedDate;
let timerId = null;

btnStart.setAttribute('disabled', '');
btnStart.style.fontSize = '20px';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    statusSelectedDate();
  },
});

function statusSelectedDate() {
  if (selectedDate - new Date() < 0) {
    return Notiflix.Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
  }
  preparesForStart();
}

function preparesForStart() {
  Notiflix.Notify.info(
    'You have selected the correct date, click the "Start button" to start the timer.',
    {
      clickToClose: true,
    }
  );

  btnStart.removeAttribute('disabled');
  btnStart.addEventListener('click', onStartBtnClick);
}

function onStartBtnClick() {
  btnStart.textContent = 'Reset';
  datetimeInputEl.setAttribute('disabled', '');
  btnStart.removeEventListener('click', onStartBtnClick);
  Notiflix.Notify.success('Timer is running!', {
    clickToClose: true,
  });

  updateTimer();

  timerId = setInterval(updateTimer, 48);

  btnStart.addEventListener('click', onResetBtnClick);
}

function onResetBtnClick() {
  Notiflix.Notify.info('The timer is cleared, select a new date.');

  clearInterval(timerId);

  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
 
  datetimeInputEl.removeAttribute('disabled');
  btnStart.textContent = 'Start';
  btnStart.setAttribute('disabled', '');
  btnStart.removeEventListener('click', onResetBtnClick);
}

function updateTimer() {
  const { days, hours, minutes, seconds, milliseconds } = convertMs(
    selectedDate - new Date()
  );
  if (selectedDate - new Date() < 0) {
    onResetBtnClick();
    return;
  }

  refs.days.textContent = addLeadingZero(days, 2);
  refs.hours.textContent = addLeadingZero(hours, 2);
  refs.minutes.textContent = addLeadingZero(minutes, 2);
  refs.seconds.textContent = addLeadingZero(seconds, 2);

}

function addLeadingZero(value, amount) {
  return value.toString().padStart(amount, '0');
}

function convertMs(ms) {
  //Кількість мілісекунд на одиницю часу

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишилось днів
  const days = Math.floor(ms / day);
  // Залишилось годин
  const hours = Math.floor((ms % day) / hour);
  // Залишилось хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Залишилось секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
  return { days, hours, minutes, seconds};
}