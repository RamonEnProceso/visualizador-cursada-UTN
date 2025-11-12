import { renderCareer} from '../render/renderCareers';
import { renderButtons } from '../render/renderButtons';
import { Career } from '../interfaces/career';
import { careerSelected } from '../render/renderButtons';

const loadCareer = async (
  name: string,
  file: string,
  careersData: Record<string, Career>,
  nameContainer: HTMLHeadingElement,
  tableContainer: HTMLElement,
  coursedSubjects: Record<string, boolean>,
  approvedSubjects: Record<string, boolean>,
  chosenElectives: Record<string, string[]>,
  buttonContainer: HTMLElement,
  inputsFiltersButton : HTMLInputElement[],
  textAlert:HTMLElement
) => {
    const curriculum = await fetch(file);
    careersData[name] = await curriculum.json();
    renderCareer(name,careersData,nameContainer,tableContainer,coursedSubjects,approvedSubjects,chosenElectives, textAlert)
    renderButtons(buttonContainer, careersData, nameContainer, tableContainer,coursedSubjects,approvedSubjects,chosenElectives, textAlert);
};

export const careerButtonsRender = async (
  order: string[],
  careersData: Record<string, Career>,
  nameContainer: HTMLHeadingElement,
  tableContainer: HTMLElement,
  coursedSubjects: Record<string, boolean>,
  approvedSubjects: Record<string, boolean>,
  chosenElectives: Record<string, string[]>,
  buttonContainer: HTMLElement,
  inputsFiltersButton : HTMLInputElement[],
  textAlert:HTMLElement
) => {
    for (const career of order){
        await loadCareer(career, `/data/ingenieria_${career}.json`, careersData, nameContainer, tableContainer, coursedSubjects, approvedSubjects, chosenElectives, buttonContainer, inputsFiltersButton, textAlert)
    }
    const input = document.getElementById(careerSelected) as HTMLInputElement;
    input.checked =true;
    
    await setTimeout(()=>{
      renderCareer(careerSelected,careersData,nameContainer,tableContainer,coursedSubjects,approvedSubjects,chosenElectives, textAlert)
    },150)
    
}
