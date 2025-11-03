import { Subject, Duration } from "../interfaces/career";
import { createDomElement } from "../helpers/domHelpers";
import { createSubjectCheckboxes } from "./subjects/renderSubjectsCheckboxes";
import { renderSubjectDuration } from "./subjects/renderSubjectsDuration";
import { Career } from '../interfaces/career';
import { renderSubjectRequirements } from "./subjects/renderRequirements";
import { electiveNumber, electiveNumberAdd } from "../helpers/storageHelpers";
import { durationOffState } from "../logic/uiToggles";

export const renderSubjects = (
    subject : Subject, 
    careerId:string,
    levelHtml:HTMLElement,
    electivesSelect:HTMLElement, 
    careersArray: Record<string, Career>,
    coursedSubjects : Record<string, boolean>,  
    approvedSubjects : Record<string, boolean>, 
    chosenElectives : Record<string, string[]>) =>{

    const div = createDomElement("div", "content_subjects none");
    const divSpan = createDomElement("span","content_name",undefined,subject.name)
    div.appendChild(divSpan);

    const duration = createDomElement("div","content_duration");
    const durationDiv = createDomElement("div","content_duration_div");

    

    if ((subject.duration?.length ?? 0) > 1){
        const sl = document.createElement("select")
        sl.className = "duration_select"
        sl.name = "duration"
        subject.duration?.forEach(option =>{
            const op = createDomElement("option","",undefined,option.name);
            op.value = option.name;
            sl.appendChild(op);
        })
        renderSubjectDuration(subject, subject.duration?.[0].name ?? "", durationDiv)
        sl.addEventListener("change",()=>{
        durationDiv.textContent = ""
        renderSubjectDuration(subject, sl.value, durationDiv)
        })
        duration.appendChild(sl);
    }else{
    if (!subject.elective){
        renderSubjectDuration(subject, subject.duration?.[0].name ?? "", durationDiv)
    }
    }

    duration.appendChild(durationDiv)
    div.appendChild(duration)

    if(subject.elective){
                //Acá debo poner para elegir la cantidad de electivas
        const number = subject.number || 1;

        for (let i = 0; number > i; i++){
        const divElective = document.createElement("div");
        divElective.className="elective_div";
        const clonedSelect = electivesSelect.cloneNode(true) as HTMLSelectElement;
        clonedSelect.id = `elective-select-${careerId}-${electiveNumber}`
        clonedSelect.className = "subject_select"
        electiveNumberAdd()
        divElective.appendChild(clonedSelect);

        const span = document.createElement("span");
        span.textContent="--No se ha seleccionado una materia--";
        span.className="span_elective"
        divElective.appendChild(span);

        clonedSelect.addEventListener("change",()=>{
        divElective.innerHTML="";
        divElective.appendChild(clonedSelect);
                        
        const electiveDuration = document.createElement("div")
        electiveDuration.className = "content_duration"
        if (durationOffState){
            electiveDuration.classList.add("hidden")
        }

        const chosen = clonedSelect.value; 

        if (!chosenElectives[subject.id]) {
            chosenElectives[subject.id] = [];
        }

        chosenElectives[subject.id][i] = chosen;

        divElective.querySelectorAll("input").forEach(input => input.remove());

        const subjects = careersArray[careerId]["levels"][0]["subjects"] as Subject[];
        const selectedElective = subjects.find(subject => subject.id === chosen)|| {
            id: "",
            name: "",
            duration: []
        };

        const electiveName = document.createElement("span");
        electiveName.className = "elective_name"
        electiveName.textContent = selectedElective.name;

        div.style.padding = "0";
        divSpan.style.display = "none";

        divElective.appendChild(electiveName);
        divElective.appendChild(electiveDuration)
                        

        renderSubjectDuration(selectedElective, selectedElective.duration?.[0].name ?? "", electiveDuration)
        electiveDuration.style.display = "inline-block"
        createSubjectCheckboxes(divElective,chosen, coursedSubjects, approvedSubjects, div);

        })
        div.appendChild(divElective)
        }

                
        }

    levelHtml.appendChild(div);

    if (!subject.elective){
         createSubjectCheckboxes(div,subject.id, coursedSubjects, approvedSubjects, div);
    }


    const subjectId = createDomElement("div","subject_id", undefined, subject.id)
    const divSubjectsRequirements = createDomElement("div","subject_requirements");

    div.addEventListener("mouseenter",()=>{
        div.appendChild(subjectId);

        subjectId.style.opacity = "0";
        void subjectId.offsetWidth;
        subjectId.style.opacity = "1";

        div.appendChild(divSubjectsRequirements);
        renderSubjectRequirements(subject,divSubjectsRequirements, approvedSubjects, coursedSubjects)
        
        divSubjectsRequirements.style.opacity = "0";
        void divSubjectsRequirements.offsetWidth;
        divSubjectsRequirements.style.opacity = "1";

    })
    div.addEventListener("mouseleave",()=>{
        div.removeChild(subjectId)
        divSubjectsRequirements.innerHTML="";
        div.removeChild(divSubjectsRequirements)
    })


}
