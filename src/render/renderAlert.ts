import { createDomElement } from "../helpers/domHelpers";

export const renderAlert = (
    alertText :HTMLElement,
    title :string,
    text :string
) =>{
    alertText.parentElement?.parentElement?.parentElement?.classList.add("alert");
    alertText.innerHTML = "";
    const span = createDomElement("span", "alert_error", undefined, text);
    span.style.whiteSpace = "pre-line";
    alertText.appendChild(createDomElement("span", "alert_h", undefined, title))
    alertText.appendChild(span)
}

export const closeAlert = ()=>{
    document.body.classList.remove("alert");
}