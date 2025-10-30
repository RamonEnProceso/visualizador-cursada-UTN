import { createDomElement } from "../../helpers/domHelpers";
import { Subject, Duration } from "../../interfaces/career";

export const renderSubjectDuration = (subject: Subject, vl:string, dv : HTMLElement) => {
    const durationOption = subject.duration ? Array.from(subject.duration).find((opt: Duration) => opt.name === vl) : undefined;
                
    const sp = createDomElement("span", "duration_name", undefined,durationOption?.name!)
                
    const spWeek = createDomElement("span", "duration week");
    spWeek.appendChild(createDomElement("span", "", undefined, "Por Semana: "));
    spWeek.appendChild(createDomElement("span","number",undefined,`${durationOption?.weeklyHours!}hs`));
                
    const spAcademicHours = createDomElement("span","duration academic_hours")
    spAcademicHours.appendChild(createDomElement("span", "", undefined, "Total (Cátedra): "))
    spAcademicHours.appendChild(createDomElement("span", "number", undefined, `${durationOption?.academicHours!}hs`))

    dv.appendChild(sp);
    dv.appendChild(spWeek);
    dv.appendChild(spAcademicHours);
}  
