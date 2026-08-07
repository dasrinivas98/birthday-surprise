const cursor=document.getElementById("cursor");

let mouseX=0;
let mouseY=0;

let cursorX=0;
let cursorY=0;

// Smooth cursor movement
document.addEventListener("mousemove",e=>{

    mouseX=e.clientX;
    mouseY=e.clientY;

});

// Animation loop
function animate(){

    cursorX+=(mouseX-cursorX)*0.18;
    cursorY+=(mouseY-cursorY)*0.18;

    cursor.style.left=cursorX+"px";
    cursor.style.top=cursorY+"px";

    requestAnimationFrame(animate);

}

animate();

// Enlarge on interactive elements
document.querySelectorAll(
"button,a,input,.gift,.polaroid,.heart,.memory,.envelope"
).forEach(el=>{

    el.addEventListener("mouseenter",()=>{

        cursor.classList.add("cursorGrow");

    });

    el.addEventListener("mouseleave",()=>{

        cursor.classList.remove("cursorGrow");

    });

});

// Heart burst on click
document.addEventListener("click",e=>{

    for(let i=0;i<8;i++){

        const spark=document.createElement("div");

        spark.className="spark";

        spark.innerHTML=Math.random()>0.5?"❤️":"💖";

        spark.style.left=e.clientX+"px";
        spark.style.top=e.clientY+"px";

        spark.style.transform=
        `translate(
        ${(Math.random()-0.5)*80}px,
        ${(Math.random()-0.5)*80}px
        )`;

        spark.style.animationDuration=
        (.6+Math.random()*.6)+"s";

        document.body.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },1200);

    }

});