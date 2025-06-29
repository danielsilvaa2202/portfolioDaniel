document.addEventListener("DOMContentLoaded",()=>{
    const body=document.body,html=document.documentElement,themeBtn=document.getElementById("theme-toggle-btn"),themeIcon=document.getElementById("theme-icon"),swatches=document.querySelectorAll(".color-swatch"),cursorGlow=document.getElementById("cursor-glow");
    function applyTheme(t,c){
        body.classList.remove("light-theme","dark-theme");
        body.classList.add(`${t}-theme`);
        themeIcon.className=`fa-solid fa-${t==="light"?"sun":"moon"}`;
        html.setAttribute("data-color-theme",c);
        localStorage.setItem("portfolioTheme",t);
        localStorage.setItem("portfolioColor",c);
        swatches.forEach(s=>s.classList.toggle("active",s.dataset.color===c))
    }
    themeBtn.addEventListener("click",()=>{
        const t=body.classList.contains("dark-theme")?"light":"dark",c=html.dataset.colorTheme;
        applyTheme(t,c)
    });
    swatches.forEach(s=>s.addEventListener("click",()=>applyTheme(body.classList.contains("dark-theme")?"dark":"light",s.dataset.color)));
    applyTheme(localStorage.getItem("portfolioTheme")||"dark",localStorage.getItem("portfolioColor")||"ocean");
    const observer=new IntersectionObserver(e=>e.forEach(r=>{if(r.isIntersecting){r.target.classList.add("is-visible");observer.unobserve(r.target)}}),{threshold:.15});
    document.querySelectorAll(".animate-on-scroll").forEach(el=>observer.observe(el));
    const typingEl=document.getElementById("typing-effect");
    if(typingEl){
        const words=["de Automações.","Python.","Frontend.","de Sistemas."];let i=0,j=0,d=!1;
        (function type(){
            const w=words[i];
            typingEl.textContent=d?w.substring(0,--j):w.substring(0,++j);
            typingEl.style.color="var(--cor-primaria)";
            if(!d&&j===w.length){d=!0;setTimeout(type,900)}
            else if(d&&j===0){d=!1;i=(i+1)%words.length;setTimeout(type,500)}
            else setTimeout(type,d?70:120)
        })()
    }
    if(cursorGlow)document.addEventListener("mousemove",e=>{cursorGlow.style.left=`${e.clientX}px`;cursorGlow.style.top=`${e.clientY}px`})
});
