const flames = document.querySelectorAll(".flame");
const candles = document.querySelectorAll(".candle");
const blowBtn = document.getElementById("blow");
const wish = document.getElementById("wish");

let extinguished = 0;
let blowingNow = false;

// Click/tap to blow each candle
candles.forEach((candle, index) => {
    candle.addEventListener("click", (e) => {
        e.stopPropagation();
        blowCandle(index);
    });
});

function blowCandle(index) {
    const flame = flames[index];
    if (!flame || flame.classList.contains("off")) return;

    // Mark as off immediately so it won't be re-triggered
    flame.classList.add("off");
    extinguished++;

    // Small confetti burst per candle (reduced)
    playConfettiSound();
    const rect = flames[index].getBoundingClientRect();
    confetti({
        particleCount: 10,
        spread: 30,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ["#ff4f9a", "#ffd700"]
    });

    if (extinguished >= flames.length) {
        allOut();
    }
}

function allOut() {
    // Final confetti (reduced)
    playConfettiSound();
    confetti({
        particleCount: 300,
        spread: 130
    });

    blowBtn.style.display = "none";
    wish.style.display = "block";
}

// Click the blow button to try microphone OR manual mode
blowBtn.onclick = async () => {

    if (extinguished >= flames.length) return;

    blowBtn.innerHTML = "🎤 Try blowing... or tap each candle!";
    blowBtn.disabled = true;

    try {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);

        blowBtn.innerHTML = "💨 Blow into the mic!";

        let blowCooldown = 0;

        function detect() {
            analyser.getByteFrequencyData(data);
            let volume = 0;
            for (let i = 0; i < data.length; i++) {
                volume += data[i];
            }
            volume /= data.length;

            if (volume > 35 && Date.now() > blowCooldown) {
                // Blow detected — extinguish next available candle
                for (let i = 0; i < flames.length; i++) {
                    if (!flames[i].classList.contains("off")) {
                        blowCandle(i);
                        blowCooldown = Date.now() + 500; // 500ms cooldown between blows
                        break;
                    }
                }
            }

            if (extinguished < flames.length) {
                requestAnimationFrame(detect);
            } else {
                stream.getTracks().forEach(track => track.stop());
            }
        }

        detect();

    } catch (err) {
        blowBtn.innerHTML = "👆 Tap each candle to blow!";
        blowBtn.disabled = false;
        showToast("🎤 Mic not available — just tap the candles!");
    }
};

document.getElementById("finish").onclick = () => {
    window.location.href = "final.html";
};