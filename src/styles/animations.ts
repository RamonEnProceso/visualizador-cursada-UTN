import { gsap } from "gsap";

export const animationGsap =(
    buttonsFilters : NodeListOf<Element>
)=>{
    const tl = gsap.timeline();

    const filterElements = Array.from(buttonsFilters) as HTMLElement[];

    tl.add("start", "+=0")
    .from(".aclaracion", {
        opacity: 0, 
        duration: 1, 
        y:"10", 
        ease:"power3.out"},
         `start+=0.1`)
    .from(filterElements,{
        opacity:0,
        y:"10",
        duration:0.1,
        stagger: -0.1,
        ease:"power3.out",
        clearProps: "all"
    }, "start+=0.1")
}

export const animationGsapTable = (
    tableContainer:HTMLElement
)=>{

    requestAnimationFrame(()=>{
        gsap.from([...tableContainer.children],{
            opacity:0,
            y:"40",
            duration:0.15,
            stagger: 0.1,
            ease:"power3.out",
            clearProps: "transform,opacity"
        })
    })

}

export const animationHidden = (
    el : HTMLElement,
    value : boolean
) =>{
    if(value){
        gsap.to(el,{opacity:0,duration:0.3, ease:"power3.out"})
        setTimeout(()=>{if (value){
            el.classList.add("hidden")}
        }, 150)
    }else{
        el.classList.remove("hidden")
        gsap.to(el,{opacity:1,duration:0.5, ease: "power3.out"})
    }
}

export const textAnimation = (textDiv:HTMLElement)=>{
    
}