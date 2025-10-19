export const updateSubjectVisualState = (cb: HTMLInputElement, div: HTMLElement)=>{
    if(!div) return;
    if(cb.id.includes("coursed")){
        cb.checked ? div.classList.add("coursed"): div.classList.remove("coursed");
        div.classList.remove("none");
    }
    if(cb.id.includes("approved")){
        cb.checked ? div.classList.add("approved"): div.classList.remove("approved");
        div.classList.remove("none");
    }
    if (!div.classList.contains("coursed") && !div.classList.contains("approved")) {
        div.classList.add("none");
    }
}