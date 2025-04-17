
import { BookIcon } from "../Icons/book"
import { YoutubeIcon } from "../Icons/video"
import { SideElement } from "./sideElement"

export const SideBar=()=>{
    return <div className="bg-gray-100 w-76 h-screen  fixed  left-0 top-0  ">
        <SideTop/>
       <SideElement startIcon={<BookIcon size="sm"/>} text="Twitter"/>
       <SideElement startIcon={<YoutubeIcon size="sm"/>} text="Youtube"/>
       <SideElement startIcon={<BookIcon size="sm"/>} text="twitter"/>
       <SideElement startIcon={<BookIcon size="sm"/>} text="twitter"/>
    </div>
    
}


function SideTop (){
    return <div className=" flex gap-2 pl-2  ">
       
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWGkRipIhdAAKodlvnCFRUlEYgfSBAWCQFcw&s" alt="" className="w-10 h-10 rounded-xl" /> 
         <h1 className="font-semibold text-2xl">Second Brain</h1>
      
       
    </div>
}