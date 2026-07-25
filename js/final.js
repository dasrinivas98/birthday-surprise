const restartBtn = document.getElementById("restartBtn");
const downloadBtn = document.getElementById("downloadBtn");

restartBtn.addEventListener("click", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.replace("index.html");

    },600);

});

downloadBtn.addEventListener("click", createMemoryBook);

function createMemoryBook(){

    const html = `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>Our Memories</title>

<style>

body{

font-family:Georgia,serif;

padding:60px;

line-height:1.8;

background:#fff7fb;

color:#333;

}

h1{

text-align:center;

color:#ff2d75;

}

h2{

margin-top:40px;

color:#ff2d75;

}

.quote{

font-size:22px;

font-style:italic;

text-align:center;

margin:40px 0;

}

.footer{

margin-top:60px;

text-align:center;

font-size:18px;

color:#777;

}

</style>

</head>

<body>

<h1>❤️ Our Memories ❤️</h1>

<div class="quote">

"Every love story is beautiful,
but ours is my favorite."

</div>

<h2>Our Journey</h2>

<p>

This little website was made with all my love.

Every page represented one step of our journey together.

The smiles...
The laughter...
The memories...

Thank you for making my life beautiful.

</p>

<h2>My Promise</h2>

<p>

I promise to stand beside you through every season of life.

To celebrate your victories.

To support you during difficult times.

To keep loving you a little more every single day.

</p>

<div class="footer">

❤️ Happy Birthday My Love ❤️

<br><br>

Made with endless love.

</div>

</body>

</html>
`;

    const blob = new Blob([html], { type: "text/html" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Our_Memories.html";

    link.click();

    URL.revokeObjectURL(link.href);

}

/* ============================
   Floating Hearts Background
============================ */

const canvas = document.getElementById("heartsCanvas");

const ctx = canvas.getContext("2d");

resize();

window.addEventListener("resize", resize);

function resize(){

    canvas.width = innerWidth;

    canvas.height = innerHeight;

}

const hearts = [];

for(let i=0;i<45;i++){

    hearts.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        size:10+Math.random()*18,

        speed:0.3+Math.random(),

        alpha:0.3+Math.random()*0.7

    });

}

function drawHeart(x,y,s,a){

    ctx.save();

    ctx.translate(x,y);

    ctx.scale(s/20,s/20);

    ctx.fillStyle=`rgba(255,90,160,${a})`;

    ctx.beginPath();

    ctx.moveTo(0,-5);

    ctx.bezierCurveTo(12,-20,30,-5,0,20);

    ctx.bezierCurveTo(-30,-5,-12,-20,0,-5);

    ctx.fill();

    ctx.restore();

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    hearts.forEach(h=>{

        h.y-=h.speed;

        if(h.y<-30){

            h.y=canvas.height+30;

            h.x=Math.random()*canvas.width;

        }

        drawHeart(h.x,h.y,h.size,h.alpha);

    });

    requestAnimationFrame(animate);

}

animate();