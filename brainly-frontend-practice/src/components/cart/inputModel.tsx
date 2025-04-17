import { useRef, useState } from "react"
import { Button } from "../button"
import { CloseIcon } from "../icon/close"
import { Input } from "./input"
import axios from "axios"

interface InputModelProps{
    open:boolean,
    onClose:()=>void
}

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}

export const CartInputModel=(props:InputModelProps)=>{
    //@ts-ignore
    const titleRef=useRef<any>();
    //@ts-ignore
    const linkRef=useRef<any>();

    const [type, setContenttype]=useState(ContentType.Youtube)

    async function addContent(){
        const title=titleRef.current.value;
        const link=linkRef.current.value;

        await axios.post("http://localhost:3000/user/content",{
            title,
            link,
            type
        },{
            headers:{
                "token":localStorage.getItem("token")
            }
        })

        props.onClose();

    }




    return <div>
        {props.open&&   <div className="w-screen h-screen bg-red-400 top-0 left-0 opacity-90 flex justify-center items-center fixed">
            <span className="p-4 rounded-xl bg-white h-100 w-76">
                <div className="flex justify-end">
                {<CloseIcon size="sm"onClick={props.onClose}/>}
                </div>
                <div>
                <Input refrence={titleRef} placeholder="title" type="text"/>
                <Input refrence={linkRef} placeholder="link" type="text"/>
                
               
                </div>
                <div className="flex m-4 justify-between">
                    <Button varient="primary" size="sm" text="youtube" onclick={()=>{
                        setContenttype(ContentType.Youtube)
                    }}/>
                    <Button varient="primary" size="sm" text="twitter"onclick={()=>{
                        setContenttype(ContentType.Twitter)
                    }}/>
                </div>
                <div>
                <Button varient="primary" size="sm" text="submit" auth={true} onclick={addContent}/>
                </div>
              
            </span>
    </div>}
        </div>
      
}