import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
const YourUsers = () => {
  const [Users, SetUsers] = useState([]);
   const navigate = useNavigate();
   const [load , setload] = useState(false);
   const [open , setopen] = useState(false)

  const getUsers = async () => {
    const data = JSON.parse(localStorage.getItem("PersonData"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };
      await axios.get("/yourusers", config).then((res) => {
        if (res.data.valid) {
          SetUsers(res.data.users);
        }
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const DeleteUser = async(id)=>{
    setload(true);
    try {
        await axios.post('/deleteuser', {id:id}).then(res=>{
            if(res.data.valid){
                navigate('/dashboard');
            }
        })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    {load && <Loader/>}
      <Header />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:p-10 p-3">
        {Users &&
          Users.map((props) => {
            return (
              <>
                <div
                  className={`p-2 flex cursor-pointer flex-col gap-1 bg-test shadow-lg rounded-2xl border-2 transition-transform transform 
        
        `}
                >
                  <div className="flex justify-between px-1">
                    <div className="flex gap-2">
                      <div className="p-2 rounded-full border border-gray-500">
                        <img
                          src={props.avatar}
                          className="w-10 h-10 rounded-full aspect-auto"
                        />
                      </div>
                      <div>
                        <h1 className="md:text-xl font-semibold">
                          {props.first_name} {props.last_name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                          {props.gender} , {props.domain}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h1>
                        ID : <span className="text-lg">{props.id}</span>
                      </h1>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="flex justify-between ">
                      <div className="text-sm flex-[0.7] overflow-hidden">
                        {props.email}
                      </div>

                      <div className="flex font-semibold flex[0.3] gap-1 text-[12px] md:text-[14px]">
                        STATUS:
                        {props.available ? (
                          <h1 className="text-green-500">Available</h1>
                        ) : (
                          <h1 className="text-red-500">Not Availible</h1>
                        )}
                      </div>
                    </div>
                    <div className="py-4">
                    <div className="flex  justify-between">
                      <div>
                        <button onClick={()=>{
                            const link = '/edituser/'+props._id
                            navigate(link);
                        }} className="text-lg px-3 py-2 rounded-full border-blue-500 border-2 bg-white text-blue-500 hover:text-white hover:bg-blue-500">
                            Edit
                        </button>
                      </div>
                      <div>
                        <button onClick={()=>{
                            setopen(true)
                        }} className="text-lg px-3 py-2 rounded-full border-red-500 border-2 bg-white text-red-500 hover:text-white hover:bg-red-500">
                         Delete
                        </button>
                      </div>
                    </div>
                    </div>
                  
                  </div>
                </div>
                <div className={`fixed inset-0 ${open ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-primary text-white p-6 md:p-8 md:w-96 rounded-2xl">
          <div className="flex justify-end cursor-pointer" onClick={()=>{
                setopen(false)
            }}>
                <div>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
                </div>
             
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              You Really Want to Delete ?
            </h2>
         
            <div className="flex justify-end">
         
              <button
                onClick={()=>{
                    DeleteUser(props._id)
                }}
                className="ml-4 text-white bg-red-500 px-4 py-2 rounded-xl"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
              </>
            );
          })}
          
      </div>
    </>
  );
};

export default YourUsers;
