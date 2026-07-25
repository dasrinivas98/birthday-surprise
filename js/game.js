const game=document.getElementById("gameArea");

const score=document.getElementById("score");

const done=document.getElementById("completed");

let found=0;

const TOTAL=10;

for(let i=0;i<TOTAL;i++){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    // Position within game area bounds (0-85% width, 0-80% height)
    heart.style.left=Math.random()*85+"%";

    heart.style.top=Math.random()*80+"%";

    heart.style.animationDelay=Math.random()*5+"s";

heart.onclick = () => {

    if (heart.classList.contains("found")) return;

    heart.classList.add("found");
    heart.style.pointerEvents = "none";

    found++;
    score.innerHTML = `${found} / ${TOTAL} Found`;

    confetti({
        particleCount: 35,
        spread: 80,
        origin: { y: 0.6 }
    });

    // Remove the heart after the pop animation finishes
    setTimeout(() => {
        heart.remove();
    }, 450);

    if (found === TOTAL) {

        // Wait until the last heart has popped away
        setTimeout(() => {

            confetti({
                particleCount: 300,
                spread: 180,
                origin: { y: 0.6 }
            });

            done.style.display = "block";

        }, 700);
    }

};

game.appendChild(heart);

}

document.getElementById("unlock").onclick=()=>{

window.location.href="letter.html";

};