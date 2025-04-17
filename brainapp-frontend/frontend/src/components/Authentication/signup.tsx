import { useRef } from "react"
import { Button } from "../Button/button"
import { Input } from "../Card/inputs"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Signup=()=>{

        const navigate=useNavigate();
    //@ts-ignore
        const usernameRef=useRef<any>();
        //@ts-ignore
        const passwordRef=useRef<any>();

        async function signup(){
            const name:string=usernameRef.current.value;
            const password:string=passwordRef.current.value;

            await axios.post('http://localhost:3000/user/signup',{
              name,
              
              password
            })

            navigate('/signin')

        }

    return <div className="bg-gray-400 w-screen h-screen flex justify-center items-center">
        <div className="bg-blue-300 rounded-xl p-10">
            <div className="flex justify-center mt-2 text font-semibold text-3xl">
            <h1>Sign Up</h1>
            </div>
           
            <span className="rounded  p-4 ">
                <Input reference={usernameRef} placeholder="name" onChange={()=>{}} />
                <Input reference={passwordRef} placeholder="password" onChange={()=>{}} />
                <div className="flex justify-center">
                    <Button variants="primary" size="md" text="Sign Up" auth={true} loading={false} onClick={signup}/>
                </div>
            </span>
        </div>

    </div>
}