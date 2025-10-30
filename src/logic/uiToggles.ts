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

    inputCheckboxes.forEach(cb=>{
        cb.classList.toggle("hidden");
    })
    selectSubject.forEach(sl=>{
        sl.classList.toggle("hidden");
    })
    selectDuration.forEach(sl=>{
        sl.classList.toggle("hidden");
    }) 

}

export const durationOff = (input:HTMLInputElement) => {
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration");
    durationDivs.forEach(dv=>{
        dv.classList.toggle("hidden")
    })
}