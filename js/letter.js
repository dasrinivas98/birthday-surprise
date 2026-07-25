const envelope = document.getElementById("envelope");

const paper = document.getElementById("paper");

const text = document.getElementById("letterText");

const next = document.getElementById("nextBtn");

const message = `My Dearest Love,

Happy Birthday to the most wonderful person in my life.

Every day with you has been a beautiful chapter filled with laughter, kindness, patience, and love.

Thank you for believing in me, standing beside me, and making even ordinary days feel extraordinary.

I promise to keep choosing you, supporting your dreams, and creating countless more memories together.

May this birthday bring you as much happiness as you have brought into my life.

I love you more than words can ever express.

Forever Yours ❤️`;

let index = 0;

let opened = false;

const openEnvelope = () => {

    if(opened) return;

    opened = true;

    envelope.style.pointerEvents = "none";
    envelope.classList.add("open");

    // Wait for the flap to open
    setTimeout(() => {

        paper.classList.add("showPaper");

    }, 700);

    // Hide the envelope after the paper appears
    setTimeout(() => {

        envelope.classList.add("hideEnvelope");

        typeLetter();

    }, 1200);

};

// The entire envelope, including its flap and wax seal, opens the letter.
envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", (event) => {

    if(event.key === "Enter" || event.key === " "){

        event.preventDefault();

        openEnvelope();

    }

});

// Touch support for mobile
envelope.addEventListener("touchstart", (e) => {

    e.preventDefault();

    openEnvelope();

});

function typeLetter(){

    if(index < message.length){

        text.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeLetter,35);

    }else{

        next.style.display="inline-block";

    }

}

next.onclick=()=>{

    window.location.href="cake.html";

};
