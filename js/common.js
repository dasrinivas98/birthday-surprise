/* ==========================================
   PREMIUM WEBSITE CONTROLS
========================================== */
window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

// Disable Back Button

history.pushState(null, "", location.href);

window.addEventListener("popstate", () => {

    history.pushState(null, "", location.href);

    showToast("❤️ Keep going... the best surprise is still waiting.");

});

// Disable Right Click
document.addEventListener("contextmenu", e => {

    e.preventDefault();

    showToast("❤️ This surprise is made just for you.");

});

// Disable Dragging Images
document.addEventListener("dragstart", e => {

    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }

});

// Disable Text Selection
document.addEventListener("selectstart", e => {

    if (!e.target.matches("input, textarea")) {
        e.preventDefault();
    }

});

// Disable common shortcuts
document.addEventListener("keydown", e => {

    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
    ) {

        e.preventDefault();

        showToast("❤️ Just enjoy the surprise.");

    }

});

// Toast Message
function showToast(message){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML=message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}