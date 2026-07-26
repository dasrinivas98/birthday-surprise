// Configurable birthday date - stored in localStorage
const STORAGE_KEY = "birthdayDate";

function getBirthdayDate() {
    // Check URL parameter first (e.g., ?date=2026-08-01)
    const urlParams = new URLSearchParams(window.location.search);
    const urlDate = urlParams.get('date');
    if (urlDate) {
        const date = new Date(urlDate);
        if (!isNaN(date.getTime())) {
            localStorage.setItem(STORAGE_KEY, date.toISOString());
            return date;
        }
    }
    
    // Force update to new default date (August 1, 2026)
    const defaultDate = new Date(2026, 7, 1, 0, 0, 0);
    localStorage.setItem(STORAGE_KEY, defaultDate.toISOString());
    return defaultDate;
}

function setBirthdayDate(dateString) {
    const date = new Date(dateString);
    localStorage.setItem(STORAGE_KEY, date.toISOString());
    return date;
}

function isDateReached() {
    const birthday = getBirthdayDate();
    const now = new Date();
    return now >= birthday;
}

const birthday = getBirthdayDate();

function updateCountdown() {
    const now = new Date();
    let diff = birthday - now;

    if (diff < 0) {
        diff = 0;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    // Enable/disable begin button based on date
    const beginBtn = document.getElementById("beginBtn");
    if (beginBtn) {
        if (isDateReached()) {
            beginBtn.disabled = false;
            beginBtn.style.opacity = "1";
            beginBtn.style.cursor = "pointer";
        } else {
            beginBtn.disabled = true;
            beginBtn.style.opacity = "0.5";
            beginBtn.style.cursor = "not-allowed";
        }
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Export for use in other files
if (typeof window !== 'undefined') {
    window.countdown = {
        getBirthdayDate,
        setBirthdayDate,
        isDateReached
    };
}