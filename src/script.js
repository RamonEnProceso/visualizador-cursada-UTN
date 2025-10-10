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
const nameContainer = document.getElementById("career-name");
const inputButtonOff = document.getElementById("buttons-off");
const inputOnlyCoursed = document.getElementById("only-coursed");
const inputDarkNotApproved = document.getElementById("dark-not-approved");
const careerOrder = ["textil", "naval", "quimica", "electrica", "electronica", "civil", "mecanica", "industrial", "sistemas"];
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
    nameContainer.textContent = careersData[careerId]["name"];
    //Hasta acá, lee el objeto de la carrera correspondiente 
    tableContainer.innerHTML = "";
    const careerLevels = careersData[careerId]["levels"];
    let numLevels = 0;
    //Crea el select de las diferentes electivas
    const electivesSelect = document.createElement("select");
    electivesSelect.name = "elective";
    electivesSelect.id = "elective-select";
    careerLevels.forEach((level) => {
        const levelName = level.name;
        //Itero entre materias electivas y lo coloco en el select
        if (levelName == "Electives") {
            level.subjects.forEach((subject) => {
                const option = document.createElement("option");
                option.value = subject.id;
                option.textContent = subject.name;
                electivesSelect.appendChild(option);
            });
            return;
        }
        //Acá se crea la columna y el header
        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        headerHtml.className = "content_header";
        levelHtml.appendChild(headerHtml);
        numLevels++;
        levelHtml.className = "content_column";
        let electiveNumber = 0;
        //Acá se crean las distintas materias
        level.subjects.forEach((subject) => {
            const div = document.createElement("div");
            const divSpan = document.createElement("span");
            divSpan.textContent = subject.name;
            divSpan.className = "content_name";
            div.appendChild(divSpan);
            div.className = "content_subjects none";
            const updateDivStatus = (cb) => {
                if (!div)
                    return;
                if (cb.id.includes("coursed")) {
                    cb.checked ? div.classList.add("coursed") : div.classList.remove("coursed");
                    div.classList.remove("none");
                }
                if (cb.id.includes("approved")) {
                    cb.checked ? div.classList.add("approved") : div.classList.remove("approved");
                    div.classList.remove("none");
                }
                if (!div.classList.contains("coursed") && !div.classList.contains("approved")) {
                    div.classList.add("none");
                }
            };
            const createCheckboxes = (dv, id) => {
                const approvedCheck = document.createElement("input");
                approvedCheck.type = "checkbox";
                approvedCheck.id = `${id}-approved`;
                approvedCheck.className = "checkbox";
                approvedCheck.addEventListener("change", () => {
                    if (approvedCheck.checked) {
                        coursedCheck.checked = true;
                        coursedSubjects[id] = true;
                        updateDivStatus(coursedCheck);
                    }
                    approvedSubjects[id] = approvedCheck.checked;
                    updateDivStatus(approvedCheck);
                    darkNotApproved();
                });
                const approvedLabel = document.createElement("label");
                approvedLabel.textContent = "Aprobado";
                approvedLabel.className = "checkbox_label";
                approvedLabel.htmlFor = `${id}-approved`;
                const coursedCheck = document.createElement("input");
                coursedCheck.type = "checkbox";
                coursedCheck.id = `${id}-coursed`;
                coursedCheck.className = "checkbox";
                const coursedLabel = document.createElement("label");
                coursedLabel.textContent = "Cursado";
                coursedLabel.className = "checkbox_label";
                coursedLabel.htmlFor = `${id}-coursed`;
                coursedSubjects[id] = coursedCheck.checked;
                coursedCheck.addEventListener("change", () => {
                    if (!coursedCheck.checked) {
                        approvedCheck.checked = false;
                        approvedSubjects[id] = false;
                        updateDivStatus(approvedCheck);
                    }
                    coursedSubjects[id] = coursedCheck.checked;
                    updateDivStatus(coursedCheck);
                    darkNotApproved();
                });
                dv.appendChild(coursedCheck);
                dv.appendChild(coursedLabel);
                dv.appendChild(approvedCheck);
                dv.appendChild(approvedLabel);
            };
            if (subject.elective) {
                //Acá debo poner para elegir la cantidad de electivas
                const number = subject.number || 1;
                for (let i = 0; number > i; i++) {
                    const divElective = document.createElement("div");
                    divElective.className = "elective_div";
                    const clonedSelect = electivesSelect.cloneNode(true);
                    clonedSelect.id = `elective-select-${electiveNumber}`;
                    clonedSelect.className = "subject_select";
                    electiveNumber++;
                    divElective.appendChild(clonedSelect);
                    const span = document.createElement("span");
                    span.textContent = "--No se ha seleccionado una materia--";
                    span.className = "span_elective";
                    span.style.display = "none";
                    divElective.appendChild(span);
                    clonedSelect.addEventListener("change", () => {
                        divElective.innerHTML = "";
                        divElective.appendChild(clonedSelect);
                        const chosen = clonedSelect.value;
                        console.log("Elegiste:", chosen);
                        if (!chosenElectives[subject.id]) {
                            chosenElectives[subject.id] = [];
                        }
                        chosenElectives[subject.id][i] = chosen;
                        console.log(chosenElectives);
                        divElective.querySelectorAll("input").forEach(input => input.remove());
                        const electiveOptionName = Array.from(clonedSelect.options).find(opt => opt.value === chosen);
                        const electiveName = document.createElement("span");
                        electiveName.className = "elective_name";
                        electiveName.textContent = (electiveOptionName === null || electiveOptionName === void 0 ? void 0 : electiveOptionName.textContent) || "";
                        div.style.padding = "0";
                        divSpan.style.display = "none";
                        divElective.appendChild(electiveName);
                        createCheckboxes(divElective, chosen);
                    });
                    div.appendChild(divElective);
                }
            }
            levelHtml.appendChild(div);
            if (!subject.elective) {
                createCheckboxes(div, subject.id);
            }
        });
        tableContainer.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`;
        changeCareersSize();
        tableContainer.appendChild(levelHtml);
    });
    clearFilters();
};
const renderButtons = () => {
    buttonContainer.innerHTML = "";
    Object.keys(careersData).forEach((careerKey) => {
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
        rd.addEventListener("click", () => { renderCareer(careerKey); });
        li.appendChild(rd);
        li.appendChild(lb);
        buttonContainer.appendChild(li);
    });
};
const changeCareersSize = () => {
    const count = tableContainer.children.length;
    const width = window.innerWidth;
    if (width < 895) {
        tableContainer.style.gridTemplateColumns = `repeat(${Math.floor(count / 2)}, 1fr)`;
        if (width < 500) {
            tableContainer.style.gridTemplateColumns = `repeat(2, 1fr)`;
        }
    }
    else {
        tableContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    }
};
const buttonOff = () => {
    const inputCheckboxes = document.querySelectorAll(".checkbox_label");
    const selectSubject = document.querySelectorAll(".subject_select");
    const spanElective = document.querySelectorAll(".span_elective");
    inputCheckboxes.forEach(cb => {
        if (cb.style.display === "none") {
            cb.style.display = "inline-block";
        }
        else {
            cb.style.display = "none";
        }
    });
    selectSubject.forEach(sl => {
        if (sl.style.display === "none") {
            sl.style.display = "inline-block";
            spanElective.forEach(sp => {
                sp.style.display = "none";
            });
        }
        else {
            sl.style.display = "none";
            spanElective.forEach(sp => {
                sp.style.display = "inline-block";
            });
        }
    });
};
const showOnlyCoursed = () => {
    const coursed = document.querySelectorAll("div.content_subjects:not(.coursed)");
    coursed.forEach(div => {
        if (div.style.display === "none") {
            div.style.display = "inline-block";
        }
        else {
            div.style.display = "none";
        }
    });
};
const darkNotApproved = () => {
    const allDivs = document.querySelectorAll("div.content_subjects");
    allDivs.forEach(div => {
        if (div.classList.contains("approved")) {
            div.style.opacity = "1";
        }
        else {
            div.style.opacity = inputDarkNotApproved.checked ? "0.5" : "1";
        }
    });
};
const careerButtonsRender = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const career of careerOrder) {
        yield loadCareer(career, `../data/ingenieria_${career}.json`);
    }
});
const clearFilters = () => {
    inputOnlyCoursed.checked = false;
    inputDarkNotApproved.checked = false;
    inputButtonOff.checked = false;
};
window.addEventListener('resize', changeCareersSize);
inputButtonOff.addEventListener("change", () => {
    buttonOff();
});
inputOnlyCoursed.addEventListener("change", () => {
    showOnlyCoursed();
});
inputDarkNotApproved.addEventListener("change", () => {
    darkNotApproved();
});
careerButtonsRender();
changeCareersSize();
