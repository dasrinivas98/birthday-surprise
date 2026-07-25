// Disable browser back button
history.pushState(null, "", location.href);

window.addEventListener("popstate", () => {
    history.pushState(null, "", location.href);
});