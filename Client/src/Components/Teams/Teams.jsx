import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import TeamLayout from "../Display/TeamLayout";
import Loader from "../Loader/Loader";
const Teams = () => {
  const [open, setopen] = useState(false);
  const [isData, setisData] = useState(false);
  const [Person, SetPerson] = useState();
  const [SelectedTeam , setSelectedTeam] = useState({
    users:[],
    name:'',
    members:''
  })
  const [isTeam, SetisTeam] = useState(false);
  const [load, setload] = useState(false);
  const [Teams, SetTeams] = useState([]);
  const [Confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setload(true);
    const getPerson = () => {
      const data = JSON.parse(localStorage.getItem("PersonData"));
      if (data) {
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
            setisData(true);
          }
        });
      } else {
        setisData(false);
      }
    };
    const getTeam = () => {
      const data = JSON.parse(localStorage.getItem("PersonData"));
      if (data) {
        const token = data.access;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const config = {
          headers: headers,
        };

        axios.get("/hasteam", config).then((res) => {
          if (res.data.valid) {
            SetisTeam(res.data.isTeam);
          }
        });
      } else {
        setisData(false);
      }
    };

    getPerson();
    getTeam();
    setload(false);
  }, []);

  const CreateTeam = async (name) => {
    try {
      const data = JSON.parse(localStorage.getItem("PersonData"));
      if (data) {
        const token = data.access;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const config = {
          headers: headers,
        };
        await axios.post("/createteam", { name: name }, config).then((res) => {
          if (res.data.valid) {
            navigate("/dashboard");
          }
        });
      }
    } catch (error) {}
  };

  const InitialiseTeam = () => {
    if (!isData) {
      navigate("/login");
    }
    setConfirm(true);
  };
  const [TeamName, SetTeamName] = useState(null);
  const HandleTeamChange = (e) => {
    SetTeamName(e.target.value);
  };
  const Confirmed = () => {
    if (TeamName == null || TeamName == "") {
      setConfirm(true);
    } else {
      setConfirm(false);
      CreateTeam(TeamName);
      SetTeamName("");
    }
  };

  const GetTeams = async () => {
    try {
      await axios.get("/getTeams").then((res) => {
        if (res.data.valid) {
          SetTeams(res.data.teams);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetTeams();
  }, []);

  return (
    <>
      {load && <Loader />}
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-primary p-4 ">
        <div>
          <h1
            onClick={() => {
              navigate("/dashboard");
            }}
            className="md:text-3xl text-xl flex gap-2 cursor-pointer"
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
          <div className="flex  justify-center rounded-xl p-1 bg-white ">
            <input
              type="text"
              className="text-black text-sm rounded-2xl p-1 w-[35vw] outline-none  font-semibold "
              placeholder="Search Team name "
            />
            <div className="text-center flex justify-center items-center ">
              <button className="p-1 rounded-full border border-secondary hover:bg-secondary hover:text-white text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <svg
              onClick={() => {
                navigate("/account");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-9 cursor-pointer"
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
            placeholder="search by Team name "
          />
          <div className="text-center flex justify-center items-center p-2">
            <button className="p-1 rounded-full border border-secondary hover:bg-secondary hover:text-white text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isTeam ? (
          <TeamLayout />
        ) : (
          <div className="hidden md:flex gap-8 p-2 items-center text-center justify-center">
            <button
              onClick={InitialiseTeam}
              className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
            >
              {" "}
              Create Team
            </button>
          </div>
        )}

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

      <div className="flex md:hidden gap-8 p-2 items-center text-center justify-center">
        <button
          onClick={InitialiseTeam}
          className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
        >
          {" "}
          Create Team
        </button>
      </div>

      <div className={`fixed inset-0 ${Confirm ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-primary text-white p-6 md:p-8 md:w-96 rounded-2xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Enter Team Name
            </h2>
            <input
              type="text"
              value={TeamName}
              onChange={HandleTeamChange}
              className="w-full border p-2 mb-4 outline-none text-black rounded-xl"
              placeholder="Team Name"
            />
            <div className="flex justify-end">
              <button
                onClick={Confirmed}
                className="bg-green-500 text-white  px-4 py-2 rounded-xl hover:bg-green-500"
              >
                Initialise Team
              </button>
              <button
                onClick={() => {
                  setConfirm(false);
                }}
                className="ml-4 text-white bg-red-500 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-4 p-6 md:gap-6 flex flex-col justify-between gap-3">
        {Teams &&
          Teams.map((props) => {
            return (
              <>
                <div>
                  <div className="max-w-md mx-auto bg-test rounded-xl overflow-hidden shadow-md">
                    <div className="px-6 py-4">
                      <div className="flex justify-between">
                        <div className="font-bold text-xl mb-2">
                          {props.TeamName}
                        </div>
                        <div className="text-gray-600 text-lg mb-2">
                          ID : {props.id}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-gray-600 text-sm">
                          Members : {props.TotalUsers}
                        </div>
                        <div
                          className="text-primary hover:underline cursor-pointer"
                          onClick={() => {
                            setSelectedTeam({
                              users:props.Users,
                              name:props.TeamName,
                              members:props.TotalUsers
                            })
                            setopen(true);
                          }}
                        >
                          {" "}
                          view details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`fixed z-50	 inset-0 ${open ? "block" : "hidden"}`}
                >
                  <div className="fixed inset-0 bg-black opacity-50"></div>
                  <div className="fixed inset-0 flex items-center justify-center overflow-auto">
                    <div className="bg-secondary p-6 w-[90%] md:p-8 md:w-[50%] flex flex-col md:gap-4 gap-2 rounded-2xl">
                      <div
                        className="flex justify-end cursor-pointer"
                        onClick={() => {
                          setopen(false);
                        }}
                      >
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
                        {SelectedTeam.name}
                      </h2>
                      <div className="flex text-white justify-start px-5 text-xl">
                        <h1>Members : {SelectedTeam.members}</h1>
                      </div>


                      <div className="m-0 flex flex-col gap-3 p-5 max-h-[300px] overflow-auto">
                        {SelectedTeam.users && SelectedTeam.users.map(props=>{
                          return <div className="p-2 flex flex-col gap-1 bg-test  shadow-lg rounded-2xl border-2">
                          <div className="flex justify-between px-1">
                          <div className="flex gap-2">
                                
                                 <div>
                                   <h1 className="md:text-xl text-[15px] text-primary font-semibold">
                                     {props.firstName} {props.lastName}
                                   </h1>
                                   <p className="text-primary text-sm">
                                     {props.gender} , {props.domain}
                                   </p>
                                 </div>
                               </div>
             
                               <div>
                                 <h1 className="text-primary">id: <span className="text-lg text-primary">{props.id}</span></h1>
                               </div>
                          </div>
             
                            
                             </div>
                        })}
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

export default Teams;
