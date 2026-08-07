const gift = document.getElementById("gift");

const message = document.getElementById("message");

gift.addEventListener("click", () => {

gift.classList.add("open");

message.classList.add("show");

createHearts();

setTimeout(() =>{

window.location.href="pin.html";

},3000);

});

function createHearts(){

for(let i=0;i<40;i++){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="absolute";

heart.style.left=Math.random()*100+"vw";

heart.style.top="100vh";

heart.style.fontSize=(20+Math.random()*20)+"px";

heart.style.transition="4s linear";

document.body.appendChild(heart);

setTimeout(()=>{

heart.style.transform=
`translateY(-120vh)
rotate(${Math.random()*360}deg)`;

heart.style.opacity=0;

},100);

setTimeout(()=>{

heart.remove();

},4200);

}

}