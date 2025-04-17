import { ReactElement } from "react"


interface CardtopInputs{
    startIcon:ReactElement,
    text:string,
    middleIcon:ReactElement,
    endIcon:ReactElement
}

export const CardTop=(props:CardtopInputs)=>{
    return <div className="flex justify-between gap-3 font-medium">
        <div className="flex gap-1">
          {props.startIcon}{props.text}
        </div>
        <div className="flex gap-1">
            {props.middleIcon}{props.endIcon}
        </div>
    </div>
}