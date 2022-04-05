import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      checkValidDate();
    },
  };

  let selectedDate = null;
  let counterId = null;
  
  flatpickr('#datetime-picker', options);

   const btnStart= document.querySelector('button[data-start]');
   const daysText= document.querySelector('span[data-days]');
   const hoursText= document.querySelector('span[data-hours]');
   const minutesText= document.querySelector('span[data-minutes]');
   const secondsText= document.querySelector('span[data-seconds]');
   const inputRef= document.querySelector('input');


   btnStart.addEventListener('click', onClickBtnStart);
   btnStart.setAttribute('disabled', true);
   
   function checkValidDate() {
    const currentDate = options.defaultDate;
  
    if (currentDate > selectedDate) {
      
      Notify.failure('Please choose a date in the future');
      return;
    }
  
    btnStart.removeAttribute('disabled');
  };

  function onClickBtnStart() {
    let deltaTime = selectedDate - options.defaultDate;
    startCountdown(deltaTime);
  
    btnStart.setAttribute('disabled', 'disabled');
inputRef.setAttribute('disabled', 'disabled');
  
    counterId = setInterval(() => {
      deltaTime -= 1000;
      startCountdown(deltaTime);
    }, 1000);
  };

  function startCountdown(deltaTime) {
  if (deltaTime < 1000) {
    stopCountdown();
  }

  const formattedTime = convertMs(deltaTime);
  updateTimeText(formattedTime);
}

function stopCountdown() {
  clearInterval(counterId);
  btnStart.removeAttribute('disabled');
  inputRef.removeAttribute('disabled');
}

function updateTimeText({ days, hours, minutes, seconds }) {
  daysText.textContent = pad(days);
  hoursText.textContent = pad(hours);
  minutesText.textContent = pad(minutes);
  secondsText.textContent = pad(seconds);
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
