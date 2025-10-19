export const createDomElement = <K extends keyof HTMLElementTagNameMap>(
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

export const toggleClass = (el: HTMLElement, className: string) =>{
    el.classList.toggle(className)
}