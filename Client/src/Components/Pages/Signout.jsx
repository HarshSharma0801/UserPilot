import Header from "../Header/Header";
import { useNavigate } from "react-router";



const SignOut = ()=>{

    const navigate = useNavigate();

    const data = JSON.parse(localStorage.getItem("PersonData"));
   
    const info = data.PersonInfo;
    const click = ()=>{

        localStorage.removeItem("PersonData");
        navigate('/')
    }
    return (
        <>
        <Header/>
        <div className="flex flex-col md:py-24 items-center gap-5 justify-center md:text-4xl">
    
    <div className="py-3">
       <p className="py-4 text-secondary">  <span className="text-gray-500">Hi,</span> {info.username}</p> 
       <p className="text-secondary">
      <span className="text-gray-500">you are currently signed in as</span>  {info.email}

       </p>
    </div>
    <div>
       <button onClick={click} className="p-4 px-6 text-2xl rounded-full border border-secondary text-secondary hover:text-white hover:bg-secondary">
           Sign Out
       </button>
    </div>
   </div>

        </>
    )


}


export default SignOut