import { Career, Subject } from "../../interfaces/career";
import { createDomElement } from "../../helpers/domHelpers";

export const renderSubjectRequirements = (
    subject : Subject,
    div:HTMLElement,
    coursedSubjects : Record<string, boolean>,  
    approvedSubjects : Record<string, boolean>
) =>{
    const subjectTaken = subject.taken;
    const subjectApproved = subject.approved;
    
    const divRequirements = createDomElement("div","subject_requirement_content");
    const divRequirementsTaken = createDomElement("div","requirement");
    const divRequirementsAppproved = createDomElement("div","requirement");

    const update = () =>{
        const userNotTaken : string[] = [];
        const userNotApproved : string[] = [];

        const checkId = (id:string, object:Record<string, boolean>) =>{
            return object[id] || false;
        }

        subjectTaken?.forEach((id)=>{
        if (!checkId(id,coursedSubjects)){
            userNotTaken.push(id)
        }
        })

        subjectApproved?.forEach((id)=>{
            if (!checkId(id,approvedSubjects)){
                userNotApproved.push(id)
            }
        })

        divRequirementsTaken.innerHTML=`Falta cursar: <span class="requirement_id">${userNotTaken?.join(", ")}</span>`;
        divRequirementsAppproved.innerHTML=`Falta aprobar: <span class="requirement_id">${userNotApproved?.join(", ")}</span>`;
    
        divRequirements.innerHTML="";
        
        if (subjectTaken?.length !== 0){
            divRequirements.appendChild(divRequirementsTaken);
        }

        if (subjectApproved?.length !== 0){
            divRequirements.appendChild(divRequirementsAppproved);
        }
    
        if (!div.contains(divRequirements)) div.appendChild(divRequirements);
    }
    

    update()

}