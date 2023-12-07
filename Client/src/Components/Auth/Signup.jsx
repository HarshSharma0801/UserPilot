import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const Signup = () => {
  const [err, Seterr] = useState(false);
  const [PersonData, SetPersonData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    SetPersonData({
      ...PersonData,
      [name]: value,
    });
  };
  
  const navigate = useNavigate()

  const SignUpApi = async () => {
    try {
        await axios.post('/signup' , PersonData).then(res=>{
            if(res.data.valid){
                localStorage.setItem('PersonData' , JSON.stringify(res.data));
                navigate('/');
            }
            else{
                Seterr(true)
            }
        })
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = (e)=>{
    e.preventDefault();
    SignUpApi()
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="max-w-md w-full p-6 space-y-8 bg-primary rounded-md">
          <div>
            <h2 className="text-3xl font-extrabold text-center text-white">
              Create your account
            </h2>
            {err && (
              <h1 className="text-[16px] pt-3 font-extrabold text-center text-red-500">
                Try Different Email or Username !!
              </h1>
            )}
          </div>
          <form className="space-y-6" onSubmit={Submit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="username"
                autoComplete="name"
                required
                onChange={handlechange}
                name="username"
                className="mt-1 p-2 w-full border rounded-md outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                onChange={handlechange}
                name="email"
                className="mt-1 p-2 w-full border rounded-md outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                name="password"
                onChange={handlechange}
                className="mt-1 p-2 w-full border rounded-md outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-primarylighter active:shadow-lg border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-secondary hover:bg-secondary focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
