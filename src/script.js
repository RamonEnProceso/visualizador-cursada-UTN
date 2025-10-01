"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buttonContainer = document.getElementById("button_careers_container");
const tableContainer = document.getElementById("table_of_contents_container");
const careersData = {};
const approvedSubjects = {};
const coursedSubjects = {};
const chosenElectives = {};
const loadCareer = (name, file) => __awaiter(void 0, void 0, void 0, function* () {
    const curriculum = yield fetch(file);
    careersData[name] = yield curriculum.json();
    renderCareer(name);
    renderButtons();
});
const renderCareer = (careerId) => {
    const career = careersData[careerId];
    if (!career)
        return;
    console.log(`Se ha cargado correctamente la carrera de ${careersData[careerId]["name"]}`);
    console.log(careersData[careerId]);
    //Hasta acá, lee el objeto de la carrera correspondiente 
    tableContainer.innerHTML = "";
    const careerLevels = careersData[careerId]["levels"];
    let numLevels = 0;
    //Creo el select de las diferentes electivas
    const electivesSelect = document.createElement("select");
    electivesSelect.name = "elective";
    electivesSelect.id = "elective-select";
    careerLevels.forEach((level) => {
        const levelName = level.name;
        //Itero entre materias y lo coloco en el select
        if (levelName == "Electives") {
            level.subjects.forEach((subject) => {
                const option = document.createElement("option");
                option.value = subject.id;
                option.textContent = subject.name;
                electivesSelect.appendChild(option);
            });
            return;
        }
        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        levelHtml.appendChild(headerHtml);
        numLevels++;
        //Acá se crea "el header" de la columna
        let electivasNumber = 0;
        level.subjects.forEach((subject) => {
            //Acá se crean las distintas materias
            const div = document.createElement("div");
            div.textContent = subject.name;
            if (subject.elective) {
                //Acá debo poner para elegir la cantidad de electivas
                const number = subject.number || 1;
                for (let i = 0; number > i; i++) {
                    const clonedSelect = electivesSelect.cloneNode(true);
                    clonedSelect.id = `elective-select-${electivasNumber}`;
                    electivasNumber++;
                    div.appendChild(clonedSelect);
                    clonedSelect.addEventListener("change", () => {
                        const chosen = clonedSelect.value;
                        console.log("Elegiste:", chosen);
                        if (!chosenElectives[subject.id]) {
                            chosenElectives[subject.id] = [];
                        }
                        chosenElectives[subject.id][i] = chosen;
                        console.log(chosenElectives);
                    });
                }
            }
            levelHtml.appendChild(div);
            const approvedCheck = document.createElement("input");
            approvedCheck.type = "checkbox";
            approvedCheck.id = subject.id;
            approvedCheck.addEventListener("change", () => {
                approvedSubjects[subject.id] = approvedCheck.checked;
                localStorage.setItem("approvedSubjects", JSON.stringify(approvedSubjects));
            });
            div.appendChild(approvedCheck);
            const coursedCheck = document.createElement("input");
            coursedCheck.type = "checkbox";
            coursedCheck.id = subject.id;
            coursedSubjects[subject.id] = coursedCheck.checked;
            approvedCheck.addEventListener("change", () => {
                coursedSubjects[subject.id] = coursedCheck.checked;
            });
            div.appendChild(coursedCheck);
        });
        tableContainer.appendChild(levelHtml);
    });
};
const renderButtons = () => {
    buttonContainer.innerHTML = "";
    Object.keys(careersData).forEach((careerKey) => {
        const li = document.createElement("li");
        li.textContent = careersData[careerKey]["name"];
        li.addEventListener("click", () => { renderCareer(careerKey); });
        buttonContainer.appendChild(li);
    });
};
loadCareer("sistemas", "../data/ingenieria_sistemas.json");
