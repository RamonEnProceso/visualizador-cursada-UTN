export const checkId = (id, object) => {
    return !!object[id];
};
export const checkApprovedCoursed = (subject, coursedSubjects, approvedSubjects) => {
    const subjectTaken = subject.taken;
    const subjectApproved = subject.approved;
    const userNotTaken = [];
    const userNotApproved = [];
    subjectTaken === null || subjectTaken === void 0 ? void 0 : subjectTaken.forEach((id) => {
        if (!checkId(id, coursedSubjects)) {
            userNotTaken.push(id);
        }
    });
    subjectApproved === null || subjectApproved === void 0 ? void 0 : subjectApproved.forEach((id) => {
        if (!checkId(id, approvedSubjects)) {
            userNotApproved.push(id);
        }
    });
    if (userNotTaken.length > 0 || userNotApproved.length > 0) {
        let textNotTaken = "";
        let textNotApproved = "";
        if (userNotTaken.length > 0) {
            textNotTaken = `Falta cursar: \n${userNotTaken}\n`;
        }
        if (userNotApproved.length > 0) {
            textNotApproved = `\nFalta aprobar: \n${userNotApproved}\n`;
        }
        return `Aún no desbloqueada:\n${textNotTaken + textNotApproved}`;
    }
    return false;
};
