import { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import Filters from "./Filters";
import Loader from "../Loader/Loader";
import TeamLayout from "./TeamLayout";
import { useDispatch, useSelector } from "react-redux";
import { TeamActions } from "../Context/Reducers/TeamContext";

const DisplayUsers = () => {
  const [isData, setisData] = useState(false);
  const [Person, SetPerson] = useState();
  const [isTeam, SetisTeam] = useState(false);
  const navigate = useNavigate();
  const [load, setload] = useState(false);

  useEffect(() => {
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
  }, []);

  const UsersPerPage = 20;
  const [Users, SetUsers] = useState([]);
  const [PageCount, SetPageCount] = useState(0);
  const [ActivePage, SetActivePage] = useState(1);

  const getUsers = async () => {
    try {
      await axios
        .get("/users", {
          params: {
            page: ActivePage,
          },
        })
        .then((res) => {
          if (res.data) {
            SetUsers(res.data.DisplayUsers);
            SetPageCount(Math.ceil(res.data.TotalUsers / UsersPerPage));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [ActivePage]);

  const PageChanged = ({ selected }) => {
    SetActivePage(parseInt(selected) + 1);
  };

  const [SearchValue, SetSearch] = useState();
  const Search = (e) => {
    SetSearch(e.target.value);
  };

  const SearchQuery = async (key) => {
    await axios
      .get("/users/search", {
        params: {
          Search: key,
        },
      })
      .then((res) => {
        if (res.data.valid) {
          SetUsers(res.data.users);
          setload(false);
        } else {
          SetUsers((prev) => {
            return prev;
          });
        }
      });
  };
  const getInitialUsers = async () => {
    setload(true);
    try {
      await axios
        .get("/users", {
          params: {
            page: 1,
          },
        })
        .then((res) => {
          if (res.data) {
            SetUsers(res.data.DisplayUsers);
            SetPageCount(Math.ceil(res.data.TotalUsers / UsersPerPage));
            setload(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const GetFiltered = (data) => {
    SetUsers(data);
  };
  const dispatch = useDispatch();
  const showError = useSelector((state) => state.TeamContext.error);
  if (showError) {
    setTimeout(() => {
      dispatch(TeamActions.Seterror());
      console.log(showError);
    }, 1700);
  }
  const SetTeam = ()=>{
    SetisTeam(false)
  }
  return (
    <>
      {load && <Loader />}
      {showError && (
        <div className="flex justify-center fixed z-[100] p-5 top-0 left-10 w-[90%]">
          <div className="bg-red-400 text-white  p-2 text-sm md:p-4  rounded-full md:w-[30%] text-center">
            Choose Different Domain or User
          </div>
        </div>
      )}
      <div className="flex justify-between md:justify-around items-center  w-[100%] text-white bg-primary p-4 ">
        <div>
          <h1
            onClick={() => {
              getInitialUsers();
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
              onChange={Search}
              className="text-black text-sm rounded-2xl p-1 w-[35vw] outline-none  font-semibold "
              placeholder="search by name "
            />
            <div className="text-center flex justify-center items-center ">
              <button
                onClick={() => {
                  SearchQuery(SearchValue);
                }}
                className="p-1 rounded-full border border-secondary hover:bg-secondary hover:text-white text-secondary"
              >
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
            onChange={Search}
            className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
            placeholder="search by name "
          />
          <div className="text-center flex justify-center items-center p-2">
            <button
              onClick={() => {
                SearchQuery(SearchValue);
              }}
              className="p-1 rounded-full border border-secondary hover:bg-secondary hover:text-white text-secondary"
            >
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
        <div className="hidden md:flex gap-8 p-2 items-center text-center justify-center">
          <button
            onClick={() => {
              navigate("/teams");
            }}
            className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
          >
            Teams
          </button>

          {isTeam && <TeamLayout SetTeam={SetTeam} />}
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
      <div className="min-h-screen p-2">
        <div className="flex md:gap-4 gap-2 justify-center">
          <div className="md:hidden">
          {isTeam && <TeamLayout SetTeam={SetTeam} />}
          </div>

          <Filters GetFiltered={GetFiltered} />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:p-10 p-3">
          {Users &&
            Users.map((data) => {
              return (
                <DisplayCard
                  key={data._id}
                  id={data.id}
                  avatar={data.avatar}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  gender={data.gender}
                  domain={data.domain}
                  email={data.email}
                  available={data.available}
                />
              );
            })}
        </div>
        <div className="pb-5">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={PageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={PageChanged}
            pageLinkClassName="p-[5px]   md:p-2 border-[1.9px] border-primary rounded-xl hover:text-white hover:bg-secondary"
            containerClassName="flex justify-center gap-2 md:text-lg text-sm"
            previousLinkClassName="p-[4px] md:p-2 border-primary border-[1.9px] rounded-xl hover:bg-secondary hover:text-white"
            nextLinkClassName="p-[4px] md:p-2 border-primary border-[1.9px] rounded-xl hover:bg-secondary hover:text-white"
            activeClassName="text-secondary "
          />
        </div>
      </div>
    </>
  );
};

export default DisplayUsers;
