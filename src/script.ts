const buttonContainer : HTMLElement = document.getElementById("button_careers_container")!;
const tableContainer : HTMLElement = document.getElementById("table_of_contents_container")!;

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

    console.log(`Se ha cargado correctamente la carrera de ${careersData[careerId]["name"]}`)
    console.log(careersData[careerId]);

    //Hasta acá, lee el objeto de la carrera correspondiente 

    tableContainer.innerHTML = "";

    const careerLevels = careersData[careerId]["levels"];

    let numLevels : number = 0;

    //Creo el select de las diferentes electivas
    const electivesSelect = document.createElement("select");
    electivesSelect.name = "elective";
    electivesSelect.id = "elective-select";

    careerLevels.forEach((level : Level)=>{
        
        const levelName = level.name;

        //Itero entre materias y lo coloco en el select
        if (levelName == "Electives"){
            level.subjects.forEach((subject : Subject)=>{
                const option = document.createElement("option");
                option.value = subject.id;
                option.textContent = subject.name;
                electivesSelect.appendChild(option);
            })
            return
        }

        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        levelHtml.appendChild(headerHtml);
        numLevels++;

        //Acá se crea "el header" de la columna

        let electivasNumber = 0;

        level.subjects.forEach((subject : Subject)=>{
            //Acá se crean las distintas materias

            const div = document.createElement("div");
            div.textContent = subject.name

            if(subject.elective){
                //Acá debo poner para elegir la cantidad de electivas
                const number = subject.number || 1;

                for (let i = 0; number > i; i++){
                    const clonedSelect = electivesSelect.cloneNode(true) as HTMLSelectElement;
                    clonedSelect.id = `elective-select-${electivasNumber}`
                    electivasNumber++;
                    div.appendChild(clonedSelect);

                    clonedSelect.addEventListener("change",()=>{
                        const chosen = clonedSelect.value; 
                        console.log("Elegiste:", chosen);

                        if (!chosenElectives[subject.id]) {
                            chosenElectives[subject.id] = [];
                        }

                        chosenElectives[subject.id][i] = chosen;
                        console.log(chosenElectives);
                        
                    })

                }

                
            }

            levelHtml.appendChild(div);

            const approvedCheck = document.createElement("input");
            approvedCheck.type="checkbox";
            approvedCheck.id= subject.id;
            approvedCheck.addEventListener("change",()=>{
                approvedSubjects[subject.id] = approvedCheck.checked;
                localStorage.setItem("approvedSubjects", JSON.stringify(approvedSubjects));
            })

            div.appendChild(approvedCheck)

            const coursedCheck = document.createElement("input");
            coursedCheck.type="checkbox";
            coursedCheck.id= subject.id;
            coursedSubjects[subject.id] = coursedCheck.checked;
            approvedCheck.addEventListener("change",()=>{
                coursedSubjects[subject.id] = coursedCheck.checked;
            })
            div.appendChild(coursedCheck)

        })
        tableContainer.appendChild(levelHtml);
    })
}

const renderButtons = () =>{
    buttonContainer.innerHTML = "";

    Object.keys(careersData).forEach((careerKey)=>{
        const li = document.createElement("li");
        li.textContent = careersData[careerKey]["name"];
        li.addEventListener("click", () =>{renderCareer(careerKey)})
        buttonContainer.appendChild(li);
    })

}

loadCareer("sistemas","../data/ingenieria_sistemas.json");