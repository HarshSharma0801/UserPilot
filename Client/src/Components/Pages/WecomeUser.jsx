import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const WelcomeUser = () => {
  const [Person, SetPerson] = useState();
  const [isData , setisData] = useState(); 

  const navigate = useNavigate()

  useEffect(() => {
    const getPerson = () => {
      const data = JSON.parse(localStorage.getItem("PersonData"));
      if(data){
        const token = data.access;
        const headers = {
            Authorization: `Bearer ${token}`,
          };
          const config = {
            headers: headers,
          };
    
          axios.get("/Token", config).then((res) => {
            if (res) {
                SetPerson(res.data.ExistingUser);
                setisData(true)
            }
          });

      }
      else{
        setisData(false);
      }
  
    };

    getPerson();
  }, []);


  return (
    <>
      <div className="min-h-screen flex  items-center justify-center bg-primary">
        <div className="flex flex-col gap-[2rem] justify-center items-center text-center">

            {isData ?<><div>
            <h1 className="text-3xl text-white"> 🤗Bravo!! {Person && Person.username}</h1>

            </div>
            <div>
            <button  onClick={()=>{
                navigate('/dashboard')
            }}  className=" flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-secondary active:shadow-lg border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-secondary hover:bg-secondary focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary">
           ZipZap Zooo!!
          </button>
            </div></>  : <><div>
            <h1 className="text-3xl text-white"> It looks likes you haven't Logged In 😴😂 </h1>

            </div>
            <div className="flex gap-2">
            <button onClick={()=>{
                navigate('/login')
            }}  className=" flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-secondary active:shadow-lg rounded-md shadow-sm text-lg font-medium text-white bg-secondary border border-secondary  hover:bg-secondary focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary">
           Login
          </button>
          <button  onClick={()=>{
                navigate('/signup')

}} className=" flex justify-center  py-3 px-4 transition duration-150 ease-in-out active:bg-secondary active:shadow-lg rounded-md shadow-sm text-lg font-medium text-secondary bg-white border border-secondary  hover:bg-secondary hover:text-white focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-secondary">
           Sign up
          </button>
            </div></> }
           

     
       
        </div>
      </div>
    </>
  );
};

export default WelcomeUser;
