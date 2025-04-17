import { ReactElement } from "react"

type VarientType="primary"|"secondary"

interface ButtonProps{
    varient:VarientType,
    size:"sm"|"lg"|"md",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onclick?:()=>void,
    auth?:boolean

}

const varientStyle={
    "primary":"bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800 ",
    "secondary":"bg-indigo-100 text-blue-500 cursor-pointer hover:bg-indigo-200"
}

const sizeStyle={
    "sm":"px-3 py-1",
    "md":"px-5 py-2",
    "lg":"px-6 py-3"
}
const defaultStyle="flex rounded-xl "

export const Button=(props:ButtonProps)=>{
    return <button onClick={props.onclick} className={`${defaultStyle} ${varientStyle[props.varient]} ${sizeStyle[props.size]} ${props.auth?"w-full flex py-3 justify-center":""}`}>{props.startIcon?<div className="pr-2">{props.startIcon}</div>:null}{props.text} {props.endIcon} </button>
}