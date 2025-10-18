import './style.css'
import confetti from 'canvas-confetti';
import { renderCareer, Career } from './renderCareer';

const buttonContainer : HTMLElement = document.getElementById("button_careers_container")!;
const tableContainer : HTMLElement = document.getElementById("table_of_contents_container")!;
const nameContainer : HTMLHeadingElement = document.getElementById("career-name") as HTMLHeadingElement;
const inputButtonOff : HTMLInputElement = document.getElementById("buttons-off") as HTMLInputElement;
const inputDurationOff : HTMLInputElement = document.getElementById("duration-off") as HTMLInputElement;
const inputOnlyCoursed : HTMLInputElement = document.getElementById("only-coursed") as HTMLInputElement;
const inputDarkNotApproved : HTMLInputElement = document.getElementById("dark-not-approved") as HTMLInputElement;

const careerOrder : string[] = ["textil","naval","quimica","electrica","electronica","civil","mecanica","industrial","sistemas"];

const careersData: Record<string, Career> = {};
export const approvedSubjects: Record<string, boolean> = {};
export const coursedSubjects: Record<string, boolean> = {};
export const chosenElectives: Record<string, string[]> = {};

const loadCareer = async (name : string, file : string) => {
    const curriculum = await fetch(file);
    careersData[name] = await curriculum.json();
    renderCareer(name,careersData,nameContainer,tableContainer,coursedSubjects,approvedSubjects,chosenElectives)
    renderButtons();
};

const renderButtons = () =>{
    buttonContainer.innerHTML = "";

    Object.keys(careersData).forEach((careerKey)=>{
        const li = document.createElement("li");
        const rd = document.createElement("input");
        rd.type = "radio";
        rd.id = careerKey;
        rd.className = "career_radio";
        rd.name = "chosen_career";
        rd.checked = true;
        const lb = document.createElement("label");
        lb.textContent = careersData[careerKey]["name"];
        lb.htmlFor = careerKey;
        lb.className = "career_label";
        rd.addEventListener("click", () =>{renderCareer(careerKey,careersData,nameContainer,tableContainer,coursedSubjects,approvedSubjects,chosenElectives)})
        li.appendChild(rd);
        li.appendChild(lb);
        buttonContainer.appendChild(li);
    })

}

const changeCareersSize = () =>{
    const count = tableContainer.children.length;
    const width = window.innerWidth;
    if (width < 895){
        tableContainer.style.gridTemplateColumns = `repeat(2, 1fr)`
    } else{
        tableContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`
    }
}

const buttonOff = () =>{
    const inputCheckboxes = document.querySelectorAll<HTMLElement>(".checkbox_label");
    const selectSubject = document.querySelectorAll<HTMLElement>(".subject_select");
    const spanElective = document.querySelectorAll<HTMLElement>(".span_elective");
    const selectDuration = document.querySelectorAll<HTMLElement>(".duration_select");

    inputCheckboxes.forEach(cb=>{
        if (cb.style.display === "none"){
            cb.style.display = "inline-block"
        } else{
            cb.style.display = "none"
        }
    })
    selectSubject.forEach(sl=>{
        if (sl.style.display === "none"){
            sl.style.display = "inline-block"
            spanElective.forEach(sp =>{
                sp.style.display = "none"
            })
        } else{
            sl.style.display = "none"
            spanElective.forEach(sp =>{
                sp.style.display = "inline-block"
            })
        }
    })
    selectDuration.forEach(sl=>{
        if (sl.style.display === "none"){
            sl.style.display = "block"
        } else{
            sl.style.display = "none"
        }
    }) 

}

const durationOff = () => {
    const durationDivs = document.querySelectorAll<HTMLElement>(".content_duration_div");
    durationDivs.forEach(dv=>{
        if (inputDurationOff.checked){
            dv.style.display = "none"
        } else{
            dv.style.display = "block"
        }
    })
}

const showOnlyCoursed = () =>{
    const coursed = document.querySelectorAll<HTMLElement>("div.content_subjects:not(.coursed)");
    
    coursed.forEach(div =>{
        if (div.style.display ==="none"){
            div.style.display = "inline-block"
        }else{
            div.style.display = "none"
        }
    })
}

const darkNotApproved = ()=>{
    const allDivs = document.querySelectorAll<HTMLElement>("div.content_subjects");
    
    allDivs.forEach(div => {
        if (div.classList.contains("approved")) {
            div.style.opacity = "1";
        } else {
            div.style.opacity = inputDarkNotApproved.checked ? "0.5" : "1";
        }
    })
}

const careerButtonsRender = async () => {
    for (const career of careerOrder){
        await loadCareer(career, `/data/ingenieria_${career}.json`)
    }
}

const clearFilters = () => {
    inputOnlyCoursed.checked = false;
    inputDarkNotApproved.checked = false;
    inputButtonOff.checked = false;
}

window.addEventListener('resize', changeCareersSize);
window.addEventListener('load', changeCareersSize);

inputButtonOff.addEventListener("change", ()=>{
    buttonOff();
})

inputOnlyCoursed.addEventListener("change",()=>{
    showOnlyCoursed();
})

inputDarkNotApproved.addEventListener("change",()=>{
    darkNotApproved();
})

inputDurationOff.addEventListener("change", () =>{
    durationOff();
})

careerButtonsRender();
changeCareersSize();