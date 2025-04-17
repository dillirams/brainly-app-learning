import { ReactElement } from "react"

interface CartTopInputs{
    startIcon:ReactElement,
    text:string,
    middleIcon:ReactElement,
    endICon:ReactElement
}

const defaultStyle="flex justify-around items-center gap-3 bg-red-200"

export const CartTop=(props:CartTopInputs)=>{
return <div className={`${defaultStyle}`}>{props.startIcon}{props.text}{props.middleIcon}{props.endICon}</div>
}