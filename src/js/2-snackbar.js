import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector(".form"),
    formDelay: document.querySelector('[name="delay"]'),
    formState: document.querySelector('[name="state"]'),
};

refs.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const stateValue = document.querySelector('[name="state"]:checked').value;
    const delayValue = refs.formDelay.value;
    if (!delayValue || !stateValue) {
        return;
    }
    createPromise(delayValue, stateValue)
        .then((delay) => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: "topRight",
                backgroundColor: "#338733",
                timeout: 5000,
                transitionIn: "fadeInDown",
            });
        })
        .catch((delay) => {
            iziToast.show({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
                backgroundColor: "#FF4D4D",
                timeout: 5000,
                transitionIn: "fadeInDown",
            });
        });
    refs.form.reset();
});
function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else if (state === "rejected") {
                reject(delay);
            }
        }, delay);
    });
}
