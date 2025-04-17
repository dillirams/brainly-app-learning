import { useRef } from "react"
import { Button } from "../Button/button"
import { Input } from "../Card/inputs"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SignIn=()=>{

    const navigate=useNavigate();
    //@ts-ignore
    const nameRef=useRef<any>();
        //@ts-ignore
    const passwordRef=useRef<any>();

    async function signin() {

        const name=nameRef.current.value;
        const password=passwordRef.current.value;
        
        const response=await axios.post("http://localhost:3000/user/signin",{
            name,
            password
        })

        const jwt=response.data.token;
        localStorage.setItem("token",jwt);
        navigate('/dashboard')
        
    }

    return <div className="bg-gray-400 w-screen h-screen flex justify-center items-center">
        <div className="bg-blue-300 rounded-xl p-10">
            <div className="flex justify-center mt-2 text font-semibold text-3xl">
            <h1>SignIn</h1>
            </div>
           
            <span className="rounded  p-4 ">
                <Input reference={nameRef} placeholder="name" onChange={()=>{}} />
                <Input reference={passwordRef} placeholder="password" onChange={()=>{}} />
                <div className="flex justify-center">
                    <Button variants="primary" size="md" text="Sign In" auth={true} loading={false} onClick={signin}/>
                </div>
            </span>
        </div>

    </div>
}