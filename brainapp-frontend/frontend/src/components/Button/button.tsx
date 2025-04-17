import { ReactElement } from "react"

type ButtonVariants="primary"|"secondary"

interface ButtonInputs{
    variants:ButtonVariants,
    size:"sm"|"md"|"lg",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick?:()=>void,
    auth?:boolean,
    loading?:boolean


}

const variantStyle={
    "primary":"bg-indigo-600 text-white",
    "secondary":"bg-indigo-100 text-indigo-600"
}
const sizeStyle={
    "sm":"px-3 py-1",
    "md":"px-5 py-2",
    "lg":"px-6 py-3"
}

const defaultStyle="flex rounded-xl item-center cursor-pointer font-semibold"

export const Button=(props:ButtonInputs)=>{
return <button onClick={props.onClick} className={`${defaultStyle} ${variantStyle[props.variants]} ${sizeStyle[props.size]} ${props.auth?" w-full justify-center":""} ${props.loading?" opacity-45":""} `} disabled={props.loading}>{props.startIcon?<div className="pr-2"  >{props.startIcon}</div>:null}{props.text} </button>
}