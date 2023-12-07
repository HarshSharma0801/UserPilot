import { useState , useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Loader from "../Loader/Loader";


const Header = () => {

    const [isData , setisData] = useState(false);
    const [Person, SetPerson] = useState();
    const navigate = useNavigate();

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
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-primary p-4 ">
        <div>
          <h1
            onClick={() => {
              navigate("/dashboard");
            }}
            className=" text-xl md:text-3xl flex gap-1 cursor-pointer"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-9 md:h-9 w-5 h-7 text-secondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <div className="font-bold">UserPilot</div>
          </h1>
        </div>
        <div className="flex gap-1 justify-center md:hidden">
         

          <div>
            <svg
              onClick={() => {
                if(isData){
                  navigate("/account");
                }
                else{
                  navigate("/login");

                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
        <div className="hidden md:flex  justify-center rounded-2xl bg-white ">
          <input
            type="text"
            className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
            placeholder="search"
          />
          <div className="text-center flex justify-center items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-secondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className=" hidden md:flex gap-8 p-2 items-center text-center justify-center">
          <div>
            {isData ? (
              <button
                onClick={() => {
                  navigate("/account");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                Hi, {Person && Person.username}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="p-3 font-bold px-6 rounded-full  border-2 border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
