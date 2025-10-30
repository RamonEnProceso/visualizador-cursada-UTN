export const clearFilters = (inputs : HTMLInputElement[]) => {
    inputs.forEach((input)=>{
        input.checked = false;
    })
}

export const showOnlyCoursed = () =>{
    const coursed = document.querySelectorAll<HTMLElement>("div.content_subjects:not(.coursed)");
    
    coursed.forEach(div =>{
        div.classList.toggle("hidden");
    })
}

export const darkNotApproved = (inputDarkNotApproved:HTMLInputElement)=>{
    const allDivs = document.querySelectorAll<HTMLElement>("div.content_subjects");
    
    allDivs.forEach(div => {
        if (div.classList.contains("approved")) {
            div.style.opacity = "1";
        } else {
            div.style.opacity = inputDarkNotApproved.checked ? "0.5" : "1";
        }
    })
}

