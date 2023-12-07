import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router";
import axios from "axios";
const Account = () => {
  const navigate = useNavigate();
  const [isTeam, SetisTeam] = useState(false);
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
  useEffect(() => {
    getTeam();
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen w-screen p-3">
        <div className="flex md:flex-row flex-col">
          <div className="flex md:hidden gap-8 p-2 items-center text-center justify-center">
            {!isTeam && (
              <button
                onClick={() => {
                  navigate("/teams");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                {" "}
                Teams
              </button>
            )}
          </div>

          <div className="flex md:flex-row flex-col  gap-8 p-7 items-center text-center justify-center">
              <button
                onClick={() => {
                  navigate("/adduser");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                {" "}
               Add User +
              </button>
              <button
                onClick={() => {
                  navigate("/yourusers");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                {" "}
               Your Users
              </button>
              <button
                onClick={() => {
                  navigate("/signout");
                }}
                className="flex px-[19px] py-1 text-[17px] border-2 rounded-xl border-secondary  bg-white text-secondary hover:text-white hover:bg-secondary"
              >
                {" "}
               Login Info
              </button>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
