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
        if (cb.style.display === "none"){
            cb.style.display = "inline-block"
        } else{
            cb.style.display = "none"
        }
    })
    selectSubject.forEach(sl=>{
        if (sl.style.display === "none"){
            sl.style.display = "inline-block"
            spanElective.forEach(sp =>{
                sp.style.display = "none"
            })
        } else{
            sl.style.display = "none"
            spanElective.forEach(sp =>{
                sp.style.display = "inline-block"
            })
        }
    })
    selectDuration.forEach(sl=>{
        if (sl.style.display === "none"){
            sl.style.display = "block"
        } else{
            sl.style.display = "none"
        }
    }) 

}

export const durationOff = (input:HTMLInputElement) => {
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration_div");
    durationDivs.forEach(dv=>{
        if (input.checked){
            dv.style.display = "none"
        } else{
            dv.style.display = "block"
        }
    })
}