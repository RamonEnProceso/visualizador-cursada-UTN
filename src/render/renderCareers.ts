import { Career, Subject, Level } from '../interfaces/career';
import { createDomElement } from '../helpers/domHelpers';
import { renderSubjects } from './renderSubjects';
import {animationGsapTable} from '../styles/animations'
import { electiveNumberReset } from '../helpers/storageHelpers';
import { changeCareersSize, durationOffUpdate, buttonOffUpdate } from '../logic/uiToggles';

export const renderCareer = (
    careerId : string, 
    careersArray: Record<string, Career>, 
    header : HTMLHeadingElement, 
    container : HTMLElement, 
    coursedSubjects : Record<string, boolean>, 
    approvedSubjects : Record<string, boolean>, 
    chosenElectives : Record<string, string[]>,
    textAlert:HTMLElement
    ) =>{

    const career = careersArray[careerId];
    
    
    animationGsapTable(container);
    if (!career) return;

    header.textContent = careersArray[careerId]["name"];

    container.replaceChildren();

    const careerLevels = careersArray[careerId]["levels"];
    let numLevels : number = 0;
    let electiveNumber = 0;

    const electivesSelect = createDomElement("select","elective","elective-select");

    electiveNumberReset();

    
    const optionNone = createDomElement("option","",undefined, "-- Selecciona una materia --");
    optionNone.value = "";
    electivesSelect.appendChild(optionNone)

    careerLevels.forEach((level : Level)=>{
        
        const levelName = level.name;

        if (levelName == "Electives"){
            level.subjects.forEach((subject : Subject)=>{
                const option = createDomElement("option","",undefined,subject.name);
                option.value = subject.id;
                electivesSelect.appendChild(option);
            })
            return
        }

        const levelHtml =  createDomElement("div","content_column");
        const headerHtml = createDomElement("div","content_header",undefined,levelName)
        levelHtml.appendChild(headerHtml);
        numLevels++;

        level.subjects.forEach((subject : Subject)=>{
            renderSubjects(subject,careerId,levelHtml,electivesSelect,careersArray,coursedSubjects,approvedSubjects,chosenElectives, textAlert)
        })

        container.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`
        

        container.appendChild(levelHtml);
    })
    changeCareersSize(container)
    durationOffUpdate()
    buttonOffUpdate()
}