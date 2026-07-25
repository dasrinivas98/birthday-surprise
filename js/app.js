const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    beginBtn.disabled = true;

    beginBtn.innerHTML = "Loading Your Surprise ❤️";

    document.body.style.transition = "opacity 1s";

    document.body.style.opacity = 0;

    setTimeout(() => {

        window.location.href = "gift.html";

    }, 1000);

});