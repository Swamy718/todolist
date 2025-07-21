import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import User from "./components/User"
import SignUp from "./components/SignUp"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
