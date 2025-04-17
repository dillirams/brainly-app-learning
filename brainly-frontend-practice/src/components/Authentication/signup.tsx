import { useRef } from "react"
import { Button } from "../button"
import { Input } from "../cart/input"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signup=()=>{

    const navigate=useNavigate();
    //@ts-ignore
    const nameRef=useRef<any>();
     //@ts-ignore
    const emailRef=useRef<any>();
     //@ts-ignore
    const passwordRef=useRef<any>()
   async function signup(){
        const name=nameRef.current.value;
        const email=emailRef.current.value
        const password=passwordRef.current.value

        await axios.post("http://localhost:3000/user/signup",{
            name,
            email,
            password,
            
            
        }) 
        navigate('/signin')
    }



    return <div className="bg-gray-400 h-screen w-screen flex justify-center items-center rounded-xl">
            <span className=" bg-white p-10 h-100 w-70 rounded-xl">
                <div className="flex justify-center ">
                    <h1 className="text-3xl font-medium">Sign Up</h1>
                </div>
                <div className="mt-5">
                    <Input refrence={nameRef} placeholder="name" type="text"/>
                    <Input refrence={emailRef} placeholder="email" type="email"/>
                    <Input refrence={passwordRef} placeholder="password" type="password"/>

                </div>
                <div className="mt-10">
                    <Button varient="primary" size="sm" auth={true} text="sigin up" onclick={signup}/>
                </div>
            </span>
    </div>
}