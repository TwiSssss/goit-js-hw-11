import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import pathErrorIcon from "../img/error-icon.svg";

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    dateTimePicker: document.querySelector("#datetime-picker"),
    clockface: document.querySelector(".timer"),
    clockField: document.querySelector(".field"),
    daysField: document.querySelector("[data-days]"),
    hoursField: document.querySelector("[data-hours]"),
    minutesField: document.querySelector("[data-minutes]"),
    secondsField: document.querySelector("[data-seconds]"),
};
let targetTime = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        targetTime = selectedDates[0];
        if (targetTime <= Date.now()) {
            refs.startBtn.disabled = true;
            iziToast.show({
                message: "Please choose a date in the future!",
                position: "topRight",
                backgroundColor: "#FF4D4D",
                iconUrl: pathErrorIcon,
                timeout: 5000,
                transitionIn: "fadeInDown",
            });
        } else {
            refs.startBtn.disabled = false;
        }
        console.log(targetTime);
    },
};

flatpickr(refs.dateTimePicker, options);

const timer = {
    intervalId: null,
    start() {
        console.log("START");
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    },

    tick() {
        const currentTime = Date.now();
        const ms = targetTime - currentTime;
        if (ms <= 0) {
            this.stop();
            refs.dateTimePicker.disabled = false;
            return;
        }
        const time = convertMs(ms);
        refs.daysField.textContent = addLeadingZero(time.days);
        refs.hoursField.textContent = addLeadingZero(time.hours);
        refs.minutesField.textContent = addLeadingZero(time.minutes);
        refs.secondsField.textContent = addLeadingZero(time.seconds);
    },

    stop() {
        clearInterval(this.intervalId);
    },
};
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

refs.startBtn.addEventListener("click", () => {
    refs.startBtn.disabled = true;
    refs.dateTimePicker.disabled = true;
    timer.start();
});
refs.startBtn.disabled = true;

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
