import { Career, Subject, Level } from '../interfaces/career';
import { createDomElement } from '../helpers/domHelpers';
import { renderSubjects } from './renderSubjects';

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
            renderSubjects(subject,careerId,levelHtml,electiveNumber,electivesSelect,careersArray,coursedSubjects,approvedSubjects,chosenElectives)
        })

        container.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`
        

        container.appendChild(levelHtml);
        //changeCareersSize();
    })
    //clearFilters();
    //inputDurationOff.checked = true;
    //durationOff();
}