
interface InputProps{
    placeholder: string,
    onChange:()=>void,
    reference:any
}

export function Input(props:InputProps){
    return <div className="m-3 ">
        <input ref={props.reference} className="px-3 py-2  rounded-xl bg-white w-90" placeholder={props.placeholder} onChange={props.onChange} type="text" name="" id="" />
    </div>
}