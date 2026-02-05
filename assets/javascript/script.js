// far scomparire freccia su e farla apparire solo a metà pagina
const up=document.getElementById('up');
document.addEventListener('scroll', ()=>{
    const half= document.documentElement.scrollHeight / 2;
    if(window.scrollY > half){
        up.style.display= 'block';
    }else{
        up.style.display ="none";
    }
});
// ----------------------------------------------------------
// chiusura menu hamburger appena cliccato
const menu= document.querySelector('.menu-ham');
const alink=document.querySelectorAll('.menu-list a');
alink.forEach(link=>{
    link.addEventListener('click', ()=>{
        menu.removeAttribute('open');
   })
});
