/*export const updateSubjectVisualState = (cb: HTMLInputElement, div: HTMLElement)=>{
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
*/

export const updateSubjectVisualState = (div: HTMLElement, id: string, coursedSubjects: Record<string,boolean>, approvedSubjects: Record<string,boolean>)=>{
    if(!div) return;

    if(coursedSubjects[id] && approvedSubjects[id]){
        div.classList.remove("coursed");
        div.classList.add("approved");
        div.classList.remove("none");
        return
    }
    if(coursedSubjects[id]){
        div.classList.add("coursed");
        div.classList.remove("approved");
        div.classList.remove("none");
        return
    }else{
        div.classList.remove("coursed", "approved");
        div.classList.add("none")
    }
    
}

