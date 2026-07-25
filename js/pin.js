const pinInput=document.getElementById("pin");

const error=document.getElementById("error");

const buttons=document.querySelectorAll(".keypad button");

const SECRET="1808"; // Replace with your date

buttons.forEach(btn=>{

btn.onclick=()=>{

const txt=btn.innerText;

if(txt==="⌫"){

pinInput.value=pinInput.value.slice(0,-1);

return;

}

if(txt==="✓"){

checkPin();

return;

}

if(pinInput.value.length<4){

pinInput.value+=txt;

}

}

});

function checkPin(){

if(pinInput.value===SECRET){

error.style.color="#6cff8d";

error.innerHTML="Unlocked ❤️";

setTimeout(()=>{

window.location.href="timeline.html";

},1200);

}else{

error.innerHTML="Wrong PIN ❤️";

pinInput.value="";

}

}