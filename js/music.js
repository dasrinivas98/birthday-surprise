/* ==========================================
   PERSISTENT MUSIC PLAYER (All Pages)
   ========================================== */

const MUSIC_KEY = "birthdayMusicPlaying";
const TIME_KEY = "birthdayMusicTime";

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (music && musicBtn) {

    // Restore previous state
    const wasPlaying = localStorage.getItem(MUSIC_KEY) === "true";
    const savedTime = parseFloat(localStorage.getItem(TIME_KEY)) || 0;

    music.currentTime = savedTime;

    if (wasPlaying) {
        music.play().then(() => {
            musicBtn.innerHTML = "🔊";
        }).catch(() => {
            musicBtn.innerHTML = "🔇";
        });
    } else {
        musicBtn.innerHTML = "🔇";
    }

    // Save time periodically
    setInterval(() => {
        if (!music.paused) {
            localStorage.setItem(TIME_KEY, music.currentTime);
        }
    }, 1000);

    // Toggle play/pause
    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();
            musicBtn.innerHTML = "🔊";
            localStorage.setItem(MUSIC_KEY, "true");

        } else {

            music.pause();
            musicBtn.innerHTML = "🔇";
            localStorage.setItem(MUSIC_KEY, "false");

        }

    });

    // Smooth transition when leaving page
    window.addEventListener("beforeunload", () => {
        localStorage.setItem(TIME_KEY, music.currentTime);
        localStorage.setItem(MUSIC_KEY, music.paused ? "false" : "true");
    });

    // Fade in on page load to avoid crackling
    music.volume = 0;
    if (!music.paused) {
        const fadeIn = setInterval(() => {
            if (music.volume < 1) {
                music.volume = Math.min(music.volume + 0.1, 1);
            } else {
                clearInterval(fadeIn);
            }
        }, 50);
    }

}