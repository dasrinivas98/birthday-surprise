const cards=document.querySelectorAll(".memory");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.3
});

cards.forEach(card=>observer.observe(card));

document
.getElementById("continue")
.onclick=()=>{

window.location.href="gallery.html";

};