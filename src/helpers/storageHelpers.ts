export let electiveNumber = 0;
export const electiveNumberAdd = ()=>{
    electiveNumber++
}
export const electiveNumberReset = () => {
    electiveNumber = 0
}

export const storageData = (
    coursedSubjects:Record<string,boolean>,
    approvedSubjects:Record<string,boolean>
)=>{
    const data = {
        "coursed":coursedSubjects,
        "approved":approvedSubjects
    }
    localStorage.setItem("dataSubjects",JSON.stringify(data))
}

export const storageDataLoad = ()=>{
    const data = JSON.parse(localStorage.getItem("dataSubjects")||"{}");
    return data
}

export const storageElectives = (chosenElectives :Record<string, string[]>)=>{
    localStorage.setItem("electives",JSON.stringify(chosenElectives));
}

export const storageElectivesLoad = ()=>{
    const electives = JSON.parse(localStorage.getItem("electives")||"{}");
    return electives
}

export const storageUI = (
    dataContainer :string,
    value : boolean
) =>{
    localStorage.setItem(dataContainer,JSON.stringify(value));
}

export const storageUILoad = (dataContainer :string) =>{
    const value = JSON.parse(localStorage.getItem(dataContainer)||"{}");
    return value
}

export const storageCareerSelected = (value:string) =>{
    localStorage.setItem("career",value)
}

