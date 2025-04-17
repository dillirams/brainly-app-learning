
interface CartTitleInputs{
    text:string
}

const defaultStyle='p-2 font-bold'
export const CartTitle=(props:CartTitleInputs)=>{
    return <div className={`${defaultStyle}`}>{props.text}</div>
}