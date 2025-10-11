const buttonContainer : HTMLElement = document.getElementById("button_careers_container")!;
const tableContainer : HTMLElement = document.getElementById("table_of_contents_container")!;
const nameContainer : HTMLHeadingElement = document.getElementById("career-name") as HTMLHeadingElement;
const inputButtonOff : HTMLInputElement = document.getElementById("buttons-off") as HTMLInputElement;
const inputDurationOff : HTMLInputElement = document.getElementById("duration-off") as HTMLInputElement;
const inputOnlyCoursed : HTMLInputElement = document.getElementById("only-coursed") as HTMLInputElement;
const inputDarkNotApproved : HTMLInputElement = document.getElementById("dark-not-approved") as HTMLInputElement;


const careerOrder : string[] = ["textil","naval","quimica","electrica","electronica","civil","mecanica","industrial","sistemas"];

const careersData: Record<string, any> = {};
const approvedSubjects: Record<string, boolean> = {};
const coursedSubjects: Record<string, boolean> = {};
const chosenElectives: Record<string, string[]> = {};

interface Duration {
    name: string;
    weeklyHours: number;
    academicHours: number;
}

interface Subject {
    name: string;
    id: string;
    duration?: Duration[];
    elective?: Boolean;
    number?: number;
}

interface Level {
    name: string;
    subjects: Subject[];
}

const loadCareer = async (name : string, file : string) => {
    const curriculum = await fetch(file);
    careersData[name] = await curriculum.json();
    renderCareer(name)
    renderButtons();
};

const renderCareer = (careerId : string) =>{
    const career = careersData[careerId];

    if (!career) return;


    nameContainer.textContent = careersData[careerId]["name"];

    //Hasta acá, lee el objeto de la carrera correspondiente 

    tableContainer.innerHTML = "";

    const careerLevels = careersData[careerId]["levels"];
    let numLevels : number = 0;

    //Crea el select de las diferentes electivas
    const electivesSelect = document.createElement("select");
    electivesSelect.name = "elective";
    electivesSelect.id = "elective-select";

    careerLevels.forEach((level : Level)=>{
        
        const levelName = level.name;

        //Itero entre materias electivas y lo coloco en el select
        if (levelName == "Electives"){
            level.subjects.forEach((subject : Subject)=>{
                const option = document.createElement("option");
                option.value = subject.id;
                option.textContent = subject.name;
                electivesSelect.appendChild(option);
            })
            return
        }

        //Acá se crea la columna y el header
        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        headerHtml.className = "content_header"
        levelHtml.appendChild(headerHtml);
        numLevels++;
        levelHtml.className = "content_column";

        let electiveNumber = 0;

        //Acá se crean las distintas materias
        level.subjects.forEach((subject : Subject)=>{

            const div = document.createElement("div");
            const divSpan = document.createElement("span");
            divSpan.textContent = subject.name;
            divSpan.className = "content_name"
            div.appendChild(divSpan);
            div.className = "content_subjects none";

            const duration = document.createElement("div");
            duration.className = "content_duration"
            const durationDiv = document.createElement("div");
            duration.className = "content_duration_div"

            const renderDuration = (subject: Subject, vl:string, dv : HTMLElement) => {
                const durationOption = subject.duration ? Array.from(subject.duration).find((opt: Duration) => opt.name === vl) : undefined;
                const sp = document.createElement("span");
                sp.textContent = durationOption?.name!;
                sp.className = "duration_name";
                const spWeek = document.createElement("span");
                spWeek.innerHTML = `<span>Por Semana:</span> <span class="number">${durationOption?.weeklyHours!}hs</span>`;
                spWeek.className = "duration week"
                const spAcademicHours = document.createElement("span");
                spAcademicHours.innerHTML = `<span>Total (Cátedra):</span> <span class="number">${durationOption?.academicHours!}hs</span>`;
                spAcademicHours.className = "duration academic_hours"

                console.log(spWeek.textContent)
                dv.appendChild(sp);
                dv.appendChild(spWeek);
                dv.appendChild(spAcademicHours);
                dv.className = "content_duration_div";
                dv.style.display = "none";
            }   

            if ((subject.duration?.length ?? 0) > 1){
                const sl = document.createElement("select")
                sl.className = "duration_select"
                subject.duration?.forEach(option =>{
                    const op = document.createElement("option");
                    op.textContent = option.name;
                    op.value = option.name;
                    sl.appendChild(op);
                })
                renderDuration(subject, subject.duration?.[0].name ?? "", durationDiv)
                sl.addEventListener("change",()=>{
                    durationDiv.textContent = ""
                    renderDuration(subject, sl.value, durationDiv)
                })
                duration.appendChild(sl);
            }else{
                if (!subject.elective){
                    renderDuration(subject, subject.duration?.[0].name ?? "", durationDiv)
                }
            }

            duration.appendChild(durationDiv)
            div.appendChild(duration)

            const updateDivStatus = (cb: HTMLInputElement)=>{
                if(!div) return;
                if(cb.id.includes("coursed")){
                    cb.checked ? div.classList.add("coursed"): div.classList.remove("coursed");
                    div.classList.remove("none");
                }
                if(cb.id.includes("approved")){
                    cb.checked ? div.classList.add("approved"): div.classList.remove("approved");
                    div.classList.remove("none");
                }
                if (!div.classList.contains("coursed") && !div.classList.contains("approved")) {
                    div.classList.add("none");
                }
            }

            const createCheckboxes = (dv: HTMLElement, id : string) =>{
                const approvedCheck = document.createElement("input");
                approvedCheck.type="checkbox";
                approvedCheck.id= `${id}-approved`;
                approvedCheck.className = "checkbox";
                approvedCheck.addEventListener("change",()=>{
                    if(approvedCheck.checked){
                        coursedCheck.checked = true;
                        coursedSubjects[id] = true;
                        updateDivStatus(coursedCheck)
                    }
                    approvedSubjects[id] = approvedCheck.checked;
                    updateDivStatus(approvedCheck);
                    darkNotApproved();
                })
                const approvedLabel = document.createElement("label");
                approvedLabel.textContent = "Aprobado"
                approvedLabel.className = "checkbox_label";
                approvedLabel.htmlFor = `${id}-approved`;
                        

                const coursedCheck = document.createElement("input");
                coursedCheck.type="checkbox";
                coursedCheck.id= `${id}-coursed`;
                coursedCheck.className = "checkbox";
                const coursedLabel = document.createElement("label");
                coursedLabel.textContent = "Cursado"
                coursedLabel.className = "checkbox_label";
                coursedLabel.htmlFor = `${id}-coursed`

                coursedSubjects[id] = coursedCheck.checked;
                coursedCheck.addEventListener("change",()=>{
                    if(!coursedCheck.checked){
                        approvedCheck.checked = false;
                        approvedSubjects[id] = false;
                        updateDivStatus(approvedCheck);
                    }
                    coursedSubjects[id] = coursedCheck.checked;
                    updateDivStatus(coursedCheck);
                    darkNotApproved();
                    
                })

                dv.appendChild(coursedCheck);
                dv.appendChild(coursedLabel);
                dv.appendChild(approvedCheck);
                dv.appendChild(approvedLabel)

            }

            if(subject.elective){
                //Acá debo poner para elegir la cantidad de electivas
                const number = subject.number || 1;

                for (let i = 0; number > i; i++){
                    const divElective = document.createElement("div");
                    divElective.className="elective_div";
                    const clonedSelect = electivesSelect.cloneNode(true) as HTMLSelectElement;
                    clonedSelect.id = `elective-select-${electiveNumber}`
                    clonedSelect.className = "subject_select"
                    electiveNumber++;
                    divElective.appendChild(clonedSelect);

                    const span = document.createElement("span");
                    span.textContent="--No se ha seleccionado una materia--";
                    span.className="span_elective"
                    span.style.display = "none";
                    divElective.appendChild(span);

                    clonedSelect.addEventListener("change",()=>{
                        divElective.innerHTML="";
                        divElective.appendChild(clonedSelect);
                        
                        const electiveDuration = document.createElement("div")
                        electiveDuration.className = "content_duration_div"

                        const chosen = clonedSelect.value; 

                        if (!chosenElectives[subject.id]) {
                            chosenElectives[subject.id] = [];
                        }

                        chosenElectives[subject.id][i] = chosen;

                        divElective.querySelectorAll("input").forEach(input => input.remove());

                        const subjects = careersData[careerId]["levels"][0]["subjects"] as Subject[];
                        const selectedElective = subjects.find(subject => subject.id === chosen)|| {
                            id: "",
                            name: "",
                            duration: []
                        };

                        const electiveName = document.createElement("span");
                        electiveName.className = "elective_name"
                        electiveName.textContent = selectedElective.name;

                        div.style.padding = "0";
                        divSpan.style.display = "none";

                        divElective.appendChild(electiveName);
                        divElective.appendChild(electiveDuration)

                        renderDuration(selectedElective, selectedElective.duration?.[0].name ?? "", electiveDuration)

                        createCheckboxes(divElective,chosen);

                    })
                    div.appendChild(divElective)
                }

                
            }

            levelHtml.appendChild(div);

            if (!subject.elective){
                createCheckboxes(div,subject.id);
            }

        })

        tableContainer.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`
        

        tableContainer.appendChild(levelHtml);
        changeCareersSize();
    })
    clearFilters();
    inputDurationOff.checked = true;
    durationOff();
}

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
        rd.addEventListener("click", () =>{renderCareer(careerKey)})
        li.appendChild(rd);
        li.appendChild(lb);
        buttonContainer.appendChild(li);
    })

}

const changeCareersSize = () =>{
    const count = tableContainer.children.length;
    const width = window.innerWidth;
    if (width < 895){
        tableContainer.style.gridTemplateColumns = `repeat(3, 1fr)`
        if (width < 500){
        tableContainer.style.gridTemplateColumns = `repeat(2, 1fr)`
    }
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
        await loadCareer(career, `../data/ingenieria_${career}.json`)
    }
}

const clearFilters = () => {
    inputOnlyCoursed.checked = false;
    inputDarkNotApproved.checked = false;
    inputButtonOff.checked = false;
}

window.addEventListener('resize', changeCareersSize);

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