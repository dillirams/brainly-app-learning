import axios from "axios";
import { useEffect, useState } from "react";


export function useContent (){
    const[contents, setContetnts]=useState([]);

    async function getContent() {
     const response= await axios.get("http://localhost:3000/user/content",{
        headers:{
            "token":localStorage.getItem("token")
        }
     });
     setContetnts(response.data.content)
    }

    useEffect(()=>{
        getContent();

        const timer=setInterval(()=>{
            getContent();
        },10*1000)
        return ()=>{
            clearInterval(timer)
        }
    },[])

    return contents
}