
interface InputProps{
    placeholder:string,
    type:string,
    refrence?:any
}

export const Input=(props:InputProps)=>{
    return <div className="mt-3">
        <input ref={props.refrence} type={props.type} name="" id="" placeholder={props.placeholder} className="px-3 py-2 border rounded-xl "/>
    </div>
}