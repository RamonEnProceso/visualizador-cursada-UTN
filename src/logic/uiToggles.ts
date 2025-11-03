import gsap from "gsap";

export let durationOffState = false;
let buttonOffState = false;


export const changeCareersSize = (tableContainer:HTMLElement) =>{
    const count = tableContainer.children.length;
    const width = window.innerWidth;
    if (width < 895){
        tableContainer.style.gridTemplateColumns = `repeat(2, 1fr)`
    } else{
        tableContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`
    }
}

export const buttonOff = () =>{
    const inputCheckboxes = document.querySelectorAll<HTMLElement>(".checkbox_label");
    const selectSubject = document.querySelectorAll<HTMLElement>(".subject_select");
    const spanElective = document.querySelectorAll<HTMLElement>(".span_elective");
    const selectDuration = document.querySelectorAll<HTMLElement>(".duration_select");

    buttonOffState = buttonOffState? false :true;

    inputCheckboxes.forEach(cb=>{
        animationHidden(cb, buttonOffState)
    })
    selectSubject.forEach(sl=>{
        animationHidden(sl, buttonOffState)
    })
    selectDuration.forEach(sl=>{
        animationHidden(sl, buttonOffState)
    }) 

}

export const durationOff = (input:HTMLInputElement) => {
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration");
    
    durationOffState = durationOffState? false :true;

    durationDivs.forEach(dv=>{
        animationHidden(dv, durationOffState)
    })
}

const animationHidden = (
    el : HTMLElement,
    value : boolean
) =>{
    if(value){
        gsap.to(el,{opacity:0,duration:0.3, ease:"power3.out"})
        setTimeout(()=>{if (value){
            el.classList.add("hidden")}
        }, 150)
    }else{
        el.classList.remove("hidden")
        gsap.to(el,{opacity:1,duration:0.5, ease: "power3.out"})
    }
}