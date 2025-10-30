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



    const checkId = (id:string, object:Record<string, boolean>) =>{
        return object[id] || false;
    }


    const divRequirementsTaken = createDomElement("div","requirement",undefined);
    divRequirementsTaken.innerHTML=`Se debe cursar: <span class="requirement_id">${subjectTaken?.join(", ")}</span>`
    const divRequirementsAppproved = createDomElement("div","requirement",undefined);
    divRequirementsAppproved.innerHTML=`Se debe aprobar: <span class="requirement_id">${subjectApproved?.join(", ")}</span>`

    

    if (subjectTaken?.length !== 0){
        divRequirements.appendChild(divRequirementsTaken);
    }

    if (subjectApproved?.length !== 0){
        divRequirements.appendChild(divRequirementsAppproved);
    }
    div.appendChild(divRequirements);

}