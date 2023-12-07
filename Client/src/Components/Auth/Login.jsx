import { useNavigate } from "react-router"
import axios from "axios";
import { useState } from "react";


const Login = ()=>{

   const [LoginDetails , SetLoginDetails] = useState({
    username:'',
    password:''
   })

   const [err, Seterr] = useState(false);

   const handlechange = (e)=>{
    const {name , value} = e.target;
    SetLoginDetails({
      ...LoginDetails , [name]:value
    })
   }
   
   const navigate = useNavigate();

   const LoginApi = async(data)=>{

    const res = await axios.post('/login' , data);
    if(res.data.valid){
      localStorage.setItem('PersonData' , JSON.stringify(res.data));
      navigate('/');
  }
  else{
      Seterr(true)
  }

   }

   const LoginSubmit = (e)=>{
    e.preventDefault();
    LoginApi(LoginDetails);
   }



    return (
        <>
             <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="max-w-md w-full p-6 space-y-8 bg-primary  rounded-md">
        <div>
          <h2 className="text-3xl font-semibold text-white text-center ">
            Log in to your account
          </h2>
          {err &&<h1 className='text-[16px] pt-3 font-extrabold text-center text-red-500'>Enter Correct Credentials !!</h1>}
        </div>
        <form className="space-y-6" onSubmit={LoginSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              onChange={handlechange}
              required
              className="mt-1 p-2 w-full border rounded-md outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handlechange}
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full border rounded-md outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
             
              className="w-full flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-secondary active:shadow-lg border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-secondary hover:bg-secondary focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary"
            >
            Login
            </button>
          </div>
        </form>
        <button
       onClick={()=>{
        navigate('/signup')
      }}
              className="w-full flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-primarylighter active:shadow-lg   rounded-md shadow-sm text-lg font-medium text-secondary hover:text-white bg-white border-[3px] border-secondary hover:bg-secondary focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary"
            >
            Sign Up
            </button>
      </div>
    </div>
        </>
    )


}


export default Login