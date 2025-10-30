import { createDomElement } from "../../helpers/domHelpers";
import { updateSubjectVisualState } from "../../state/subjectState";
import confetti from 'canvas-confetti';

export const createSubjectCheckboxes = (
    dv: HTMLElement, 
    id : string, 
    coursedSubjects : Record<string, boolean>, 
    approvedSubjects : Record<string, boolean>, 
    parentContainer:HTMLElement
) =>{
    const divButtons = createDomElement("div","subject_checkboxes")

    const approvedCheck = createDomElement("input","checkbox",`${id}-approved`);
    approvedCheck.type="checkbox";

    approvedCheck.addEventListener("change",()=>{
        if(approvedCheck.checked){
            confetti({
                particleCount:90
            });
            coursedCheck.checked = true;
            coursedSubjects[id] = true;
            updateSubjectVisualState(coursedCheck, parentContainer);
        }
        approvedSubjects[id] = approvedCheck.checked;
        updateSubjectVisualState(approvedCheck,parentContainer);
        //darkNotApproved();
        //console.log(approvedSubjects)
    })

    const approvedLabel = createDomElement("label","checkbox_label",undefined,"Aprobado");
    approvedLabel.htmlFor = `${id}-approved`;
                        
    const coursedCheck = createDomElement("input", "checkbox", `${id}-coursed`);
    coursedCheck.type="checkbox";
    

    const coursedLabel = createDomElement("label", "checkbox_label", undefined, "Cursado");
    coursedLabel.htmlFor = `${id}-coursed`
                
    coursedSubjects[id] = coursedCheck.checked;

    coursedCheck.addEventListener("change",()=>{
        if(!coursedCheck.checked){
            approvedCheck.checked = false;
            approvedSubjects[id] = false;
            parentContainer
            //updateSubjectVisualState(approvedCheck);
            }
            coursedSubjects[id] = coursedCheck.checked;
            //updateSubjectVisualState(coursedCheck);
            //darkNotApproved();
            updateSubjectVisualState(coursedCheck,parentContainer);
        })

        divButtons.appendChild(coursedCheck);
        divButtons.appendChild(coursedLabel);
        divButtons.appendChild(approvedCheck);
        divButtons.appendChild(approvedLabel)

    dv.appendChild(divButtons);
}
