import { Subject } from "../interfaces/career"

export const checkId = (id:string, object:Record<string, boolean>) =>{
        return !!object[id];
    }

export const checkApprovedCoursed = (
    subject: Subject,
    coursedSubjects : Record<string, boolean>,
    approvedSubjects: Record<string, boolean>) =>{

    const subjectTaken = subject.taken;
    const subjectApproved = subject.approved;

    const userNotTaken : string[] = [];
    const userNotApproved : string[] = [];

    subjectTaken?.forEach((id)=>{
        if (!checkId(id,coursedSubjects)){
            userNotTaken.push(id)
        }
    })
    
    subjectApproved?.forEach((id)=>{
        if (!checkId(id,approvedSubjects)){
            userNotApproved.push(id)
        }
    })

    if (userNotTaken.length>0 || userNotApproved.length>0){

        let textNotTaken = "";
        let textNotApproved = "";

        if(userNotTaken.length>0){
            textNotTaken = `\nFalta cursar: \n${userNotTaken}\n`;
        }
        if(userNotApproved.length>0){
            textNotApproved = `\nFalta aprobar: \n${userNotApproved}\n`;
        }

        return `${textNotTaken+textNotApproved}`
        
    }
    return false
}