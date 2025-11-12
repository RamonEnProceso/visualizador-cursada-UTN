import { Career } from "../interfaces/career";
import { renderCareer } from "./renderCareers";
import { storageCareerSelected } from "../helpers/storageHelpers";

export let careerSelected = localStorage.getItem("career") || "sistemas";

export const renderButtons = (
    buttonContainer : HTMLElement,
    careersArray: Record<string, Career>,
    header : HTMLHeadingElement, 
    table : HTMLElement , 
    coursedSubjects : Record<string, boolean>, 
    approvedSubjects : Record<string, boolean>, 
    chosenElectives : Record<string, string[]>,
    textAlert:HTMLElement
    ) =>{
    buttonContainer.replaceChildren();

    Object.keys(careersArray).forEach((careerKey)=>{
        const li = document.createElement("li");
        const rd = document.createElement("input");
        rd.type = "radio";
        rd.id = careerKey;
        rd.className = "career_radio";
        rd.name = "chosen_career";
        rd.checked = true;
        const lb = document.createElement("label");
        lb.textContent = careersArray[careerKey]["name"];
        lb.htmlFor = careerKey;
        lb.className = "career_label";
        rd.addEventListener("click", () =>{
            renderCareer(careerKey,careersArray,header,table,coursedSubjects,approvedSubjects,chosenElectives, textAlert)
            careerSelected = careerKey;
            storageCareerSelected(careerSelected);
        })
        li.appendChild(rd);
        li.appendChild(lb);
        buttonContainer.appendChild(li);
    })

}