const cards=document.querySelectorAll(".polaroid");

const light=document.getElementById("lightbox");

const img=document.getElementById("preview");

const caption=document.getElementById("caption");

cards.forEach(card=>{

card.onclick=()=>{

img.src=card.querySelector("img").src;

caption.innerHTML=card.querySelector("h3").innerHTML;

light.style.display="flex";

};

});

document.getElementById("close").onclick=()=>{

light.style.display="none";

};

light.onclick=e=>{

if(e.target===light){

light.style.display="none";

}

};

document.getElementById("nextBtn").onclick=()=>{

window.location.href="game.html";

};