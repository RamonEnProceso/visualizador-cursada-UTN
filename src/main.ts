import './styles/style.css';
import { Career, Data } from './interfaces/career';
import { careerButtonsRender } from './logic/dataLoader';
import { durationOff, buttonOff, changeCareersSize, buttonOffState, durationOffState } from './logic/uiToggles';
import { animationGsap } from './styles/animations';
import { storageDataLoad, storageElectivesLoad } from './helpers/storageHelpers';
import { closeAlert } from './render/renderAlert';

const loaderText : HTMLElement = document.getElementById("loader-p") as HTMLElement;
const alertText : HTMLElement = document.getElementById("alert-p") as HTMLElement;

const buttonContainer : HTMLElement = document.getElementById("button_careers_container") as HTMLElement;
const tableContainer : HTMLElement = document.getElementById("table_of_contents_container") as HTMLElement;
const nameContainer : HTMLHeadingElement = document.getElementById("career-name") as HTMLHeadingElement;

const buttonsFilters = document.querySelectorAll(".filters label");
const inputButtonOff : HTMLInputElement = document.getElementById("buttons-off") as HTMLInputElement;
const inputDurationOff : HTMLInputElement = document.getElementById("duration-off") as HTMLInputElement;
const alertButton : HTMLButtonElement = document.getElementById("alert-button") as HTMLButtonElement;



const careerOrder : string[] = ["textil","naval","quimica","electrica","electronica","civil","mecanica","industrial","sistemas"];

const careersData: Record<string, Career> = {};

const data : Data = storageDataLoad()
const coursedSubjects: Record<string, boolean> = data?.coursed || {};
const approvedSubjects: Record<string, boolean> = data?.approved || {};
const chosenElectives: Record<string, string[]> = storageElectivesLoad();

const inputsFiltersButton = [inputButtonOff, inputDurationOff]

window.addEventListener('resize', () => changeCareersSize(tableContainer));
window.addEventListener('load', () =>{
    changeCareersSize(tableContainer)
    setTimeout(() => {
        loaderText.textContent = "Cargando materias..."
        setTimeout(async() => {
            await careerButtonsRender(careerOrder, careersData, nameContainer, tableContainer,coursedSubjects,approvedSubjects,chosenElectives,buttonContainer,inputsFiltersButton, alertText);
            changeCareersSize(tableContainer);
            document.body.classList.remove("loading");
    }, 100);
    }, 100);
})

alertButton.addEventListener("click",()=>{
    closeAlert()
})

inputButtonOff.checked = buttonOffState;
inputButtonOff.addEventListener("change", ()=>{
    buttonOff(inputButtonOff);
})
inputDurationOff.checked = durationOffState;
inputDurationOff.addEventListener("change", () =>{
    durationOff(inputDurationOff);
})


animationGsap(buttonsFilters)