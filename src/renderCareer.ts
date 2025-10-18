import confetti from 'canvas-confetti';

export interface Career {
    name: string;
    levels: Level[];
}

interface Level {
    name: string;
    subjects: Subject[];
}

interface Subject {
    name: string;
    id: string;
    duration?: Duration[];
    elective?: Boolean;
    number?: number;
}

interface Duration {
    name: string;
    weeklyHours: number;
    academicHours: number;
}


const createElement = <K extends keyof HTMLElementTagNameMap>(
  element: K,
  clName?: string,
  idName?: string,
  text?: string
): HTMLElementTagNameMap[K] => {
    const el = document.createElement(element);
    if(clName) el.className = clName;
    if (idName) el.id = idName;
    if(text) el.textContent = text;
    return el
}

const renderDuration = (subject: Subject, vl:string, dv : HTMLElement) => {
    const durationOption = subject.duration ? Array.from(subject.duration).find((opt: Duration) => opt.name === vl) : undefined;
                
    const sp = createElement("span", "duration_name", undefined,durationOption?.name!)
                
    const spWeek = createElement("span", "duration week");
    spWeek.appendChild(createElement("span", "", undefined, "Por Semana: "));
    spWeek.appendChild(createElement("span","number",undefined,`${durationOption?.weeklyHours!}hs`));
                
    const spAcademicHours = createElement("span","duration academic_hours")
    spAcademicHours.appendChild(createElement("span", "", undefined, "Total (Cátedra): "))
    spAcademicHours.appendChild(createElement("span", "number", undefined, `${durationOption?.academicHours!}hs`))

    dv.appendChild(sp);
    dv.appendChild(spWeek);
    dv.appendChild(spAcademicHours);
    dv.className = "content_duration_div";

    //Checkear esto luego para corregir el bug de que no se muestra la duración correctamente
    dv.style.display = "none";
}   

const updateDivStatus = (cb: HTMLInputElement, div: HTMLElement)=>{
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

const createCheckboxes = (dv: HTMLElement, id : string, coursedSubjectsObject : Record<string, boolean>, approvedSubjectsObject : Record<string, boolean>, dvParent:HTMLElement) =>{
    const divButtons = createElement("div","subject_checkboxes")

    const approvedCheck = createElement("input","checkbox",`${id}-approved`);
    approvedCheck.type="checkbox";

    approvedCheck.addEventListener("change",()=>{
        if(approvedCheck.checked){
            confetti({
                particleCount:90
            });
            coursedCheck.checked = true;
            coursedSubjectsObject[id] = true;
            updateDivStatus(coursedCheck, dvParent);
        }
        approvedSubjectsObject[id] = approvedCheck.checked;
        updateDivStatus(approvedCheck,dvParent);
        //darkNotApproved();
    })

    const approvedLabel = createElement("label","checkbox_label",undefined,"Aprobado");
    approvedLabel.htmlFor = `${id}-approved`;
                        
    const coursedCheck = createElement("input", "checkbox", `${id}-coursed`);
    coursedCheck.type="checkbox";
    

    const coursedLabel = createElement("label", "checkbox_label", undefined, "Cursado");
    coursedLabel.htmlFor = `${id}-coursed`
                
    coursedSubjectsObject[id] = coursedCheck.checked;

    coursedCheck.addEventListener("change",()=>{
        if(!coursedCheck.checked){
            approvedCheck.checked = false;
            approvedSubjectsObject[id] = false;
            //updateDivStatus(approvedCheck);
            }
            coursedSubjectsObject[id] = coursedCheck.checked;
            //updateDivStatus(coursedCheck);
            //darkNotApproved();
        })

        divButtons.appendChild(coursedCheck);
        divButtons.appendChild(coursedLabel);
        divButtons.appendChild(approvedCheck);
        divButtons.appendChild(approvedLabel)

    dv.appendChild(divButtons);
}

export const renderCareer = (careerId : string, careersArray: Record<string, Career>, header : HTMLHeadingElement, container : HTMLElement, coursedSubjectsObject : Record<string, boolean>, approvedSubjectsObject : Record<string, boolean>, chosenEletivesObject : Record<string, string[]>) =>{
    const career = careersArray[careerId];

    if (!career) return;

    header.textContent = careersArray[careerId]["name"];

    //Hasta acá, lee el objeto de la carrera correspondiente 

    container.innerHTML = "";

    const careerLevels = careersArray[careerId]["levels"];
    let numLevels : number = 0;

    //Crea el select de las diferentes electivas
    const electivesSelect = createElement("select","elective","elective-select");

    careerLevels.forEach((level : Level)=>{
        
        const levelName = level.name;

        //Itero entre materias electivas y lo coloco en el select
        if (levelName == "Electives"){
            level.subjects.forEach((subject : Subject)=>{
                const option = createElement("option","",undefined,subject.name);
                option.value = subject.id;
                electivesSelect.appendChild(option);
            })
            return
        }

        //Acá se crea la columna y el header
        const levelHtml =  createElement("div","content_column");
        const headerHtml = createElement("div","content_header",undefined,levelName)
        levelHtml.appendChild(headerHtml);
        numLevels++;

        let electiveNumber = 0;

        //Acá se crean las distintas materias
        level.subjects.forEach((subject : Subject)=>{

            const div = createElement("div", "content_subjects none");
            const divSpan = createElement("span","content_name",undefined,subject.name)
            div.appendChild(divSpan);

            const duration = createElement("div","content_duration");
            const durationDiv = createElement("div","content_duration_div");

            if ((subject.duration?.length ?? 0) > 1){
                const sl = document.createElement("select")
                sl.className = "duration_select"
                subject.duration?.forEach(option =>{
                    const op = createElement("option","",undefined,option.name);
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

                        if (!chosenEletivesObject[subject.id]) {
                            chosenEletivesObject[subject.id] = [];
                        }

                        chosenEletivesObject[subject.id][i] = chosen;

                        divElective.querySelectorAll("input").forEach(input => input.remove());

                        const subjects = careersArray[careerId]["levels"][0]["subjects"] as Subject[];
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
                        electiveDuration.style.display = "inline-block"
                        createCheckboxes(divElective,chosen, coursedSubjectsObject, approvedSubjectsObject, div);

                    })
                    div.appendChild(divElective)
                }

                
            }

            levelHtml.appendChild(div);

            if (!subject.elective){
                createCheckboxes(div,subject.id, coursedSubjectsObject, approvedSubjectsObject, div);
            }

        })

        container.style.gridTemplateColumns = `repeat(${numLevels}, 1fr)`
        

        container.appendChild(levelHtml);
        //changeCareersSize();
    })
    //clearFilters();
    //inputDurationOff.checked = true;
    //durationOff();
}