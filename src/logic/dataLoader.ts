import { renderCareer} from '../render/renderCareers';
import { renderButtons } from '../render/renderButtons';
import { Career } from '../interfaces/career';

const loadCareer = async (
  name: string,
  file: string,
  careersData: Record<string, Career>,
  nameContainer: HTMLHeadingElement,
  tableContainer: HTMLElement,
  coursedSubjects: Record<string, boolean>,
  approvedSubjects: Record<string, boolean>,
  chosenElectives: Record<string, string[]>,
  buttonContainer: HTMLElement
) => {
    const curriculum = await fetch(file);
    careersData[name] = await curriculum.json();
    renderCareer(name,careersData,nameContainer,tableContainer,coursedSubjects,approvedSubjects,chosenElectives)
    renderButtons(buttonContainer, careersData, nameContainer, tableContainer,coursedSubjects,approvedSubjects,chosenElectives);
};

export const careerButtonsRender = async (
  order: string[],
  careersData: Record<string, Career>,
  nameContainer: HTMLHeadingElement,
  tableContainer: HTMLElement,
  coursedSubjects: Record<string, boolean>,
  approvedSubjects: Record<string, boolean>,
  chosenElectives: Record<string, string[]>,
  buttonContainer: HTMLElement
) => {
    for (const career of order){
        await loadCareer(career, `/data/ingenieria_${career}.json`, careersData, nameContainer, tableContainer, coursedSubjects, approvedSubjects, chosenElectives, buttonContainer)
    }
}
