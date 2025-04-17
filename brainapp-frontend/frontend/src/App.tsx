
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignIn } from './components/Authentication/signin'
import { Signup } from './components/Authentication/signup'
import { Dashboard } from './components/dashboard/dashboard'



function App() {



  return (
    <>
   <BrowserRouter>
   <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>

      <Route path='/dashboard' element={<Dashboard/>}></Route>


   </Routes>
   </BrowserRouter>
    </>

   

  )
}

export default App
