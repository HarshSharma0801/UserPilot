import { useState } from "react";
import TeamItem from "./TeamItem";
import { useSelector  , useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import axios from 'axios'
import { TeamActions } from "../Context/Reducers/TeamContext";

const TeamLayout = (props) => {
    const [open,setopen] = useState(false);
   const Members = useSelector((state)=> state.TeamContext.members);
   const TotalMembers = useSelector((state)=> state.TeamContext.Total);
   const [load,setload] = useState(false);
   const dispatch = useDispatch();
   const MakeTeam = async()=>{
    setload(true);
    const data = JSON.parse(localStorage.getItem("PersonData"));
    if (data) {
      const token = data.access;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const config = {
        headers: headers,
      };

      await axios.post('/maketeam' , {members:Members , totalmembers:TotalMembers} , config)
      .then(res=>{
        
        if(res.data.valid){
          setTimeout(()=>{
            dispatch(TeamActions.SetInitial());
            setload(false)
            setopen(false);
            props.SetTeam();
          } , 1200)
        }


      })
    
    }
   }

   const Save = ()=>{
      MakeTeam();
   }
    
  return (
    <>
    {load && <Loader/>}
      <button
      onClick={()=>{
        setopen(true);
      }}
        className={`border-secondary flex border rounded-full p-2 bg-white text-secondary hover:text-white hover:bg-secondary`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      </button>

      <div className={`fixed z-50	 inset-0 ${open?'block':'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex items-center justify-center overflow-auto">
          <div className="bg-primary p-6 w-[90%] md:p-8 md:w-[50%] flex flex-col md:gap-4 gap-2 rounded-2xl">
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
            <h2 className="text-2xl  font-bold text-white text-center mb-4 ">
              Your Team
            </h2>
            <div className="flex text-white justify-start px-5 text-xl">
            <h1>
              Members : {TotalMembers}
            </h1>
            </div>
           
            <div>
              <div className="m-0 flex flex-col gap-3 p-5 max-h-[300px] overflow-auto">
                {Members.map(member=>{
                  return  <TeamItem
                  key={member.id}
                  id={member.id}
                  avatar={member.avatar}
                  first_name={member.firstName}
                  last_name={member.lastName}
                  gender={member.gender}
                  domain={member.domain}
                />
                })}
               
             
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <button onClick={Save} className="bg-green-500 text-white px-4 py-2  hover:bg-green-600 rounded-xl">
                Make Team
              </button>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamLayout;
