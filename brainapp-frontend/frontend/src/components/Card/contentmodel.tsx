import axios from "axios";
import { Button } from "../Button/button"
import { CrossICon } from "../Icons/cross"
import { Input } from "./inputs"
import { useRef, useState } from "react";





interface ContentModelInputs{
      open:boolean,
      onClose:()=>void
}

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}


export const CreateContentModel=(props:ContentModelInputs)=>{
    //@ts-ignore
    const titleRef=useRef<any>();
        //@ts-ignore
    const linkRef=useRef<any>();

    const[type, setType]=useState(ContentType.Youtube)
    
    async function addContent(){
         
        const title=titleRef.current.value;
        const link=linkRef.current.value;

        await axios.post("http://localhost:3000/user/content",{
            title,
            link,
            type
        },{
            headers:{
                "token":localStorage.getItem("token"),
                
            }
        })

     props.onClose();
    } 





    return <div>
       {props.open&& <div className="w-screen h-screen bg-red-200 fixed top-0 left-0 opacity-90 flex justify-center items-center">
       
        <div className="bg-gray-500 flex justify-center rounded-xl w-100 max-h-100 fixed">
            <span className="p-1 ">
                <div className="flex justify-end w-90 cursor-pointer " onClick={props.onClose}>
                    <CrossICon size="sm"/>
                </div>
              <Input reference={titleRef} placeholder="title"onChange={()=>{}}/>
              <Input reference={linkRef} placeholder="link"onChange={()=>{}}/>
                <div className="flex justify-center font-semibold text-2xl text-white">
                    <h1>Type</h1>
                </div>
              <div className="flex justify-around m-3">

                <Button text="youtube" variants={type===ContentType.Youtube?"primary":"secondary"} size="sm" onClick={()=>{
                    setType(ContentType.Youtube)
                }}/>
                <Button text="twitter" variants={type===ContentType.Twitter?"primary":"secondary"} size="sm" onClick={()=>{
                    setType(ContentType.Twitter)
                }}/>

              </div>
            
                <div className="flex m-2 flex justify-center">
                <Button variants="primary" size="sm" text="submit " onClick={addContent} auth={true}/>
                </div>
              
                
            </span>
        </div>  
       
        

        </div>}
    </div>
}

