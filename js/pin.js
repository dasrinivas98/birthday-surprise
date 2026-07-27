const dots = document.querySelectorAll(".pin-dots span");
const error = document.getElementById("error");
const buttons = document.querySelectorAll(".keypad button");

const SECRET = "0103"; // Replace with your date

let pin = "";

buttons.forEach(btn => {

    btn.onclick = () => {

        const txt = btn.innerText;

        if (txt === "⌫") {
            pin = pin.slice(0, -1);
            updateDots();
            return;
        }

        if (txt === "✓") {
            checkPin();
            return;
        }

        if (pin.length < 4) {
            pin += txt;
            updateDots();
        }
    }

});

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("filled", i < pin.length);
    });
}

function checkPin() {

    if (pin === SECRET) {

        error.style.color = "#6cff8d";
        error.innerHTML = "Unlocked ❤️";

        setTimeout(() => {
            window.location.href = "timeline.html";
        }, 1200);

    } else {

        error.innerHTML = "Wrong PIN ❤️";
        pin = "";
        updateDots();

    }

}