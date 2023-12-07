import WelcomeUser from "./Components/Pages/WecomeUser"
import { Routes , Route } from "react-router"
import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import axios from "axios"
import DisplayUsers from "./Components/Display/DisplayUsers"
import Account from "./Components/Pages/Account"
import Teams from "./Components/Teams/Teams"
import Adduser from "./Components/AddUser/Adduser"
import YourUsers from "./Components/Pages/YourUsers"
import EditUser from "./Components/Pages/EditUser"
import SignOut from "./Components/Pages/Signout"
function App() {


  axios.defaults.baseURL = "https://user-pilot-backend.vercel.app/"

  return (
    <>
    
  <Routes>
    <Route path="/" element={<WelcomeUser/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<DisplayUsers/>}/>
    <Route path="/account" element={<Account/>}/>
    <Route path="/teams" element={<Teams/>}/>
    <Route path="/adduser" element={<Adduser/>}/>
    <Route path="/yourusers" element={<YourUsers/>}/>
    <Route path="/edituser/:id" element={<EditUser/>}/>
    <Route path="/signout" element={<SignOut/>}/>








  </Routes>
      
    </>
  )
}

export default App
