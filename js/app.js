const beginBtn = document.getElementById("beginBtn");

beginBtn.addEventListener("click", () => {

    if (!window.countdown || !window.countdown.isDateReached()) {
        showToast("🎂 The surprise will be revealed on the special date!");
        return;
    }

    beginBtn.disabled = true;

    beginBtn.innerHTML = "Loading Your Surprise ❤️";

    document.body.classList.add("page-transitioning");

    setTimeout(() => {

        window.location.href = "gift.html";

    }, 300);

});
