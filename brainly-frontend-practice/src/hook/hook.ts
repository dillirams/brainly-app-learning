import axios from "axios";
import { useEffect, useState } from "react";


export function useContent(){

    const[content, setContent]=useState([]);

    async function getContent() {
        const response= await axios.get("http://localhost:3000/user/content",{
            headers:{
                "token":localStorage.getItem("token")
            }
        })

        setContent(response.data.content)

    }

    useEffect(()=>{
        getContent();
        const timer=setInterval(()=>{
            getContent();

        },2000)

        return ()=>{
            clearInterval(timer)
        }
        
    },[])

    return content
}