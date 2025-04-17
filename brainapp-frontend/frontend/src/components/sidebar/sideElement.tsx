import { ReactElement } from "react"

interface SideElemetInput{
    startIcon:ReactElement,
    text:string
}

export const SideElement=(props:SideElemetInput)=>{
    return <div className="flex p-2 gap-1 m-2 font-medium cursor-pointer hover:bg-gray-200 ">
        {props.startIcon}{props.text}
    </div>
}