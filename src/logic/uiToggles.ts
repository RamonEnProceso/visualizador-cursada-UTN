import { animationHidden } from "../styles/animations";

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

export const buttonOff = (input:HTMLInputElement) =>{
    const inputCheckboxes = document.querySelectorAll<HTMLElement>(".checkbox_label");
    const selectSubject = document.querySelectorAll<HTMLElement>(".subject_select");
    const spanElective = document.querySelectorAll<HTMLElement>(".span_elective");
    const selectDuration = document.querySelectorAll<HTMLElement>(".duration_select");

    buttonOffState = input.checked;

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
    
    durationOffState = input.checked;

    durationDivs.forEach(dv=>{
        animationHidden(dv, durationOffState)
    })
}