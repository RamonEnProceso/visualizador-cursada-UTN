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
    careerLevels.forEach((level) => {
        console.log(level.name);
        const levelName = level.name;
        if (levelName == "Electives") {
            return;
        }
        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        levelHtml.appendChild(headerHtml);
        numLevels++;
        //Acá se crea "el header" de la columna
        level.subjects.forEach((subject) => {
            console.log(subject);
            //Acá se crean las distintas materias
            const div = document.createElement("div");
            div.textContent = subject.name;
            if (subject.electiva) {
                //Acá debo poner para elegir la cantidad de electivas
                div.textContent += "A elegir";
            }
            levelHtml.appendChild(div);
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
