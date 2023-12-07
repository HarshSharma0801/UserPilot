import { TeamActions } from "../Context/Reducers/TeamContext";
import { useDispatch } from "react-redux";


const TeamItem = (props)=>{
 
  const dispatch = useDispatch();

  const RemoveMember = (id)=>{
    dispatch(TeamActions.RemoveFomTeam({id:id}));
  } 
    return <>
    
    <div className="p-2 flex flex-col gap-1 bg-secondary shadow-lg rounded-2xl border-2">
             <div className="flex justify-between px-1">
             <div className="flex gap-2">
                    <div className="p-2 rounded-full border border-white">
                      <img
                        src={props.avatar}
                        className="w-7 h-7 rounded-full aspect-auto"
                      />
                    </div>
                    <div>
                      <h1 className="md:text-xl text-[15px] text-white font-semibold">
                        {props.first_name} {props.last_name}
                      </h1>
                      <p className="text-gray-200 text-sm">
                        {props.gender} , {props.domain}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-white">id: <span className="text-lg text-white">{props.id}</span></h1>
                  </div>
             </div>

                 <div className="flex justify-center">
                  <button onClick={()=>{
                    RemoveMember(props.id)
                  }} className="md:py-2 py-1 px-3 md:px-4 text-xl border border-primary rounded-full bg-white text-primary hover:bg-primary hover:text-white">
             -
                  </button>
                 </div>
                </div>

    </>

}


export default TeamItem