/* ==========================================
   PREMIUM WEBSITE CONTROLS
========================================== */

function playConfettiSound() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!window._confettiAudioCtx) {
        window._confettiAudioCtx = new AudioCtx();
    }

    const ctx = window._confettiAudioCtx;
    if (ctx.state === "suspended" && typeof ctx.resume === "function") {
        ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const variant = Math.random();

    function playBurst(frequency, duration, volume) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, now + duration);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
    }

    function playNoise(duration, volume) {
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i += 1) {
            const envelope = 1 - i / noiseData.length;
            noiseData[i] = (Math.random() * 2 - 1) * envelope * envelope;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();

        noiseGain.gain.setValueAtTime(volume, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noiseSource.connect(noiseGain).connect(ctx.destination);
        noiseSource.start(now);
        noiseSource.stop(now + duration);
    }

    if (variant < 0.4) {
        // Soft confetti pop
        playBurst(780, 0.16, 0.18);
        playNoise(0.16, 0.11);
    } else if (variant < 0.7) {
        // Sparkle + shimmer
        playBurst(920, 0.14, 0.14);
        playBurst(640, 0.12, 0.08);
        playNoise(0.12, 0.08);
    } else {
        // Gentle celebration snap
        playBurst(620, 0.18, 0.16);
        playNoise(0.18, 0.09);
    }
}

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

const journeySteps = [
    { file: "index.html", label: "The beginning" },
    { file: "pin.html", label: "A little secret" },
    { file: "timeline.html", label: "Our story" },
    { file: "gallery.html", label: "Our memories" },
    { file: "game.html", label: "A little fun" },
    { file: "gift.html", label: "A surprise" },
    { file: "letter.html", label: "A love letter" },
    { file: "cake.html", label: "Make a wish" },
    { file: "final.html", label: "Forever & always" }
];

function addJourneyProgress(){

    const currentFile = location.pathname.split("/").pop() || "index.html";
    const currentStep = journeySteps.findIndex((step) => step.file === currentFile);

    if(currentStep === -1) return;

    const tracker = document.createElement("nav");
    tracker.className = "journey-progress";
    tracker.setAttribute("aria-label", `Journey progress: ${currentStep + 1} of ${journeySteps.length}, ${journeySteps[currentStep].label}`);

    journeySteps.forEach((step, index) => {

        const dot = document.createElement("span");
        dot.className = "journey-progress__dot";

        if(index < currentStep) dot.classList.add("is-complete");
        if(index === currentStep) dot.classList.add("is-current");

        dot.setAttribute("title", step.label);
        tracker.appendChild(dot);

    });

    const label = document.createElement("span");
    label.className = "journey-progress__label";
    label.textContent = `${currentStep + 1}/${journeySteps.length}`;
    tracker.appendChild(label);

    document.body.appendChild(tracker);

}

addJourneyProgress();

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const targetUrl = new URL(href, window.location.href);
    if (targetUrl.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add("page-transitioning");
    setTimeout(() => {
        window.location.href = targetUrl.href;
    }, 220);
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
