import { Career, Subject, Level } from '../interfaces/career';
import { createDomElement } from '../helpers/domHelpers';
import { renderSubjectDuration, createSubjectCheckboxes } from './renderSubjects';

export const renderCareer = (
    careerId : string, 
    careersArray: Record<string, Career>, 
    header : HTMLHeadingElement, 
    container : HTMLElement, 
    coursedSubjects : Record<string, boolean>, 
    approvedSubjects : Record<string, boolean>, 
    chosenElectives : Record<string, string[]>) =>{
    const career = careersArray[careerId];

    if (!career) return;

    header.textContent = careersArray[careerId]["name"];

    //Hasta acá, lee el objeto de la carrera correspondiente 

    container.replaceChildren();

    const careerLevels = careersArray[careerId]["levels"];
    let numLevels : number = 0;

    //Crea el select de las diferentes electivas
    const electivesSelect = createDomElement("select","elective","elective-select");

    careerLevels.forEach((level : Level)=>{
        
        const levelName = level.name;

        //Itero entre materias electivas y lo coloco en el select
        if (levelName == "Electives"){
            level.subjects.forEach((subject : Subject)=>{
                const option = createDomElement("option","",undefined,subject.name);
                option.value = subject.id;
                electivesSelect.appendChild(option);
            })
            return
        }

        //Acá se crea la columna y el header
        const levelHtml =  createDomElement("div","content_column");
        const headerHtml = createDomElement("div","content_header",undefined,levelName)
        levelHtml.appendChild(headerHtml);
        numLevels++;

        let electiveNumber = 0;

        //Acá se crean las distintas materias
        level.subjects.forEach((subject : Subject)=>{

            const div = createDomElement("div", "content_subjects none");
            const divSpan = createDomElement("span","content_name",undefined,subject.name)
            div.appendChild(divSpan);

            const duration = createDomElement("div","content_duration");
            const durationDiv = createDomElement("div","content_duration_div");

            if ((subject.duration?.length ?? 0) > 1){
                const sl = document.createElement("select")
                sl.className = "duration_select"
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
                    clonedSelect.id = `elective-select-${electiveNumber}`
                    clonedSelect.className = "subject_select"
                    electiveNumber++;
                    divElective.appendChild(clonedSelect);

                    const span = document.createElement("span");
                    span.textContent="--No se ha seleccionado una materia--";
                    span.className="span_elective"
                    span.style.display = "none";
                    divElective.appendChild(span);

                    clonedSelect.addEventListener("change",()=>{
                        divElective.innerHTML="";
                        divElective.appendChild(clonedSelect);
                        
                        const electiveDuration = document.createElement("div")
                        electiveDuration.className = "content_duration_div"

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

        })

        container.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`
        

        container.appendChild(levelHtml);
        //changeCareersSize();
    })
    //clearFilters();
    //inputDurationOff.checked = true;
    //durationOff();
}