import { animationHidden } from "../styles/animations";
import { storageUILoad, storageUI } from "../helpers/storageHelpers";

export let durationOffState = storageUILoad("duration")  === true;
export let buttonOffState = storageUILoad("buttonOff")  === true;

export const changeCareersSize = (tableContainer:HTMLElement) =>{
    const count = tableContainer.children.length;
    const width = window.innerWidth;
    if (width < 950){
        tableContainer.style.gridTemplateColumns = `repeat(2, 1fr)`
    } else{
        tableContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`
    }
}

export const buttonOff = (input : HTMLInputElement) =>{
    buttonOffState = input.checked;
    storageUI("buttonOff",buttonOffState)
    buttonOffUpdate()
}

export const buttonOffUpdate = () =>{
    const inputCheckboxes = document.querySelectorAll<HTMLElement>(".checkbox_label");
    const selectSubject = document.querySelectorAll<HTMLElement>(".subject_select");
    const selectDuration = document.querySelectorAll<HTMLElement>(".duration_select");

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
    durationOffState = input.checked;
    storageUI("duration",durationOffState)
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration");
    durationDivs.forEach(dv=>{
        animationHidden(dv, durationOffState)
    })
}

export const durationOffUpdate = ()=>{
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration");
    durationDivs.forEach(dv=>{
        animationHidden(dv, durationOffState)
    })
}