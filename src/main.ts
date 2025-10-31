import './styles/style.css';
import { Career } from './interfaces/career';
import { careerButtonsRender } from './logic/dataLoader';
import { durationOff, buttonOff, changeCareersSize } from './logic/uiToggles';
import { showOnlyCoursed, darkNotApproved } from './logic/filters';
import { gsap } from "gsap";

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

const inputsFiltersButton = [inputButtonOff, inputDurationOff, inputOnlyCoursed, inputDarkNotApproved]

window.addEventListener('resize', () => changeCareersSize(tableContainer));
window.addEventListener('load', () => changeCareersSize(tableContainer));

inputButtonOff.addEventListener("change", ()=>{
    buttonOff();
})

inputOnlyCoursed.addEventListener("change",()=>{
    showOnlyCoursed();
})

inputDarkNotApproved.addEventListener("change",()=>{
    darkNotApproved(inputDarkNotApproved);
})

inputDurationOff.addEventListener("change", () =>{
    durationOff(inputButtonOff);
})

careerButtonsRender(careerOrder, careersData, nameContainer, tableContainer,coursedSubjects,approvedSubjects,chosenElectives,buttonContainer,inputsFiltersButton);
changeCareersSize(tableContainer);

gsap.from(".aclaracion", {opacity: 0, duration: 0.75, y:"10", ease:"power3.out"})