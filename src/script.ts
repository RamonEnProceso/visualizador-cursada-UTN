const buttonContainer : HTMLElement = document.getElementById("button_careers_container")!;
const tableContainer : HTMLElement = document.getElementById("table_of_contents_container")!;

const careersData: Record<string, any> = {};

interface Duration {
    name: string;
    weeklyHours: number;
    academicHours: number;
}

interface Subject {
    name: string;
    id: string;
    duration?: Duration[];
    electiva?: Boolean;
    cantidad?: number;
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

    careerLevels.forEach((level : Level)=>{
        console.log (level.name)
        const levelName = level.name;

        if (levelName == "Electives"){
            return
        }

        const levelHtml = document.createElement("div");
        const headerHtml = document.createElement("div");
        headerHtml.textContent = levelName;
        levelHtml.appendChild(headerHtml);
        numLevels++;

        //Acá se crea "el header" de la columna

        level.subjects.forEach((subject : Subject)=>{
            console.log(subject)
            //Acá se crean las distintas materias

            const div = document.createElement("div");
            div.textContent = subject.name

            if(subject.electiva){
                //Acá debo poner para elegir la cantidad de electivas
                div.textContent += "A elegir"
            }

            levelHtml.appendChild(div);


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