import { BookIcon } from "../Icons/book"
import { DeleteIcon } from "../Icons/delete"
import { ShareIcon } from "../Icons/share"
import { YoutubeIcon } from "../Icons/video"
import { CardTop } from "./cardTop"
import { Twitter } from "./twitter"
import { Youtube } from "./youtube"

interface CardInputs{
    title:string,
    link:string,
    type:"twitter"|"youtube"
}


export const Card=(props:CardInputs)=>{
    if(props.type==="twitter"){
        return <div className="bg-white shadow-md p-5 min-w-sm rounded-md border-slate-500 border-gray-600 border ">
        <CardTop startIcon={<BookIcon size="sm"/>} text={props.title} middleIcon={<ShareIcon size="sm"/>} endIcon={<DeleteIcon size="sm"/>}/>
        
         <Twitter/>
         </div>
    }else{
        return <div className="bg-white shadow-md p-5 max-w-lg rounded-md border-slate-500 border-gray-600 border ">
        <CardTop startIcon={<YoutubeIcon size="sm"/>} text={props.title} middleIcon={<ShareIcon size="sm"/>} endIcon={<DeleteIcon size="sm"/>}/>
         <Youtube/>
        
         </div>
    }
    
}