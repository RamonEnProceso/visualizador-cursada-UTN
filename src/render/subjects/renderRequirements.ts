import { Career, Subject } from "../../interfaces/career";
import { createDomElement } from "../../helpers/domHelpers";

export const renderSubjectRequirements = (
    subject : Subject,
    parentDiv: HTMLElement,
    div:HTMLElement,
    coursedSubjects : Record<string, boolean>,  
    approvedSubjects : Record<string, boolean>
) =>{
    const subjectTaken = subject.taken;
    const subjectApproved = subject.approved;
    
    const divRequirements = createDomElement("div","subject_requirement_content");
    const divRequirementsTaken = createDomElement("div","requirement");
    const divRequirementsAppproved = createDomElement("div","requirement");

    const userNotTaken : string[] = [];
    const userNotApproved : string[] = [];

    const checkId = (id:string, object:Record<string, boolean>) =>{
        return !!object[id];
    }

    subjectTaken?.forEach((id)=>{
        if (!checkId(id,coursedSubjects)){
            userNotTaken.push(id)
        }
        const takenDiv = document.getElementById(`${id}-div`) as HTMLElement;
        takenDiv.classList.add("focus");
        parentDiv.addEventListener("mouseleave",()=>{
            takenDiv.classList.remove("focus")
        })
    })

    subjectApproved?.forEach((id)=>{
        if (!checkId(id,approvedSubjects)){
            userNotApproved.push(id)
        }
        const approvedDiv = document.getElementById(`${id}-div`) as HTMLElement;
        approvedDiv.classList.add("focus")
        parentDiv.addEventListener("mouseleave",()=>{
            approvedDiv.classList.remove("focus")
        })
    })

    if(userNotTaken.length !== 0){
        divRequirementsTaken.innerHTML=`Falta cursar: <span class="requirement_id">${userNotTaken?.join(", ")}</span>`;
    }
    if(userNotApproved.length !==0){
        divRequirementsAppproved.innerHTML=`Falta aprobar: <span class="requirement_id">${userNotApproved?.join(", ")}</span>`;
    }

    divRequirements.innerHTML="";

    if (subjectTaken?.length !== 0){
        divRequirements.appendChild(divRequirementsTaken);
    }

    if (subjectApproved?.length !== 0){
        divRequirements.appendChild(divRequirementsAppproved);
    }
    

    if (!div.contains(divRequirements)) div.appendChild(divRequirements);

    if(divRequirements.innerHTML.trim().length === 0){
        div.remove()
    }

    if(userNotTaken.length === 0 && userNotApproved.length === 0){
        divRequirements.innerHTML= `<span class="requirement_id">Todo listo para cursarla<span>`
    }

}