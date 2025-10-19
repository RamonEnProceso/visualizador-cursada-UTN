import confetti from 'canvas-confetti';
import { Subject, Duration } from "../interfaces/career";
import { createDomElement } from "../helpers/domHelpers";
import { updateSubjectVisualState } from '../state/subjectState';

export const renderSubjectDuration = (subject: Subject, vl:string, dv : HTMLElement) => {
    const durationOption = subject.duration ? Array.from(subject.duration).find((opt: Duration) => opt.name === vl) : undefined;
                
    const sp = createDomElement("span", "duration_name", undefined,durationOption?.name!)
                
    const spWeek = createDomElement("span", "duration week");
    spWeek.appendChild(createDomElement("span", "", undefined, "Por Semana: "));
    spWeek.appendChild(createDomElement("span","number",undefined,`${durationOption?.weeklyHours!}hs`));
                
    const spAcademicHours = createDomElement("span","duration academic_hours")
    spAcademicHours.appendChild(createDomElement("span", "", undefined, "Total (Cátedra): "))
    spAcademicHours.appendChild(createDomElement("span", "number", undefined, `${durationOption?.academicHours!}hs`))

    dv.appendChild(sp);
    dv.appendChild(spWeek);
    dv.appendChild(spAcademicHours);
    dv.className = "content_duration_div";

    //Checkear esto luego para corregir el bug de que no se muestra la duración correctamente
    dv.style.display = "none";
}  

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
            //updateSubjectVisualState(approvedCheck);
            }
            coursedSubjects[id] = coursedCheck.checked;
            //updateSubjectVisualState(coursedCheck);
            //darkNotApproved();
        })

        divButtons.appendChild(coursedCheck);
        divButtons.appendChild(coursedLabel);
        divButtons.appendChild(approvedCheck);
        divButtons.appendChild(approvedLabel)

    dv.appendChild(divButtons);
}
