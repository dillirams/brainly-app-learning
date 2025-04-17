

import { Dashboard } from "./components/dashboard/dashboard"
import { Signup } from "./components/Authentication/signup"
import { SignIn } from "./components/Authentication/signin"
import { BrowserRouter,Routes, Route } from "react-router-dom"


function App() {



  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Signup/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>

    
     
    </>

   
  )
}

export default App
