import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";


const Adduser = () => {
  const navigate  = useNavigate();
    const [load , setload] = useState(false);
  const [UserDetails, SetUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
  });

  const [avatardetail, Setavatar] = useState({
    key: "",
    num: "",
  });
  const [avatar, setavatar] = useState("");
  const handleAvatar = (e) => {
    const { name, value } = e.target;
    Setavatar({
      ...avatardetail,
      [name]: value,
    });
  };
  const Makeavatar = (e) => {
    e.preventDefault();
    console.log(avatardetail);
    const link =
      "https://robohash.org/dolor" +
      avatardetail.key +
      "umvlitquam.png?size=50x50&set=set" +
      avatardetail.num;
    setavatar(link);
    Setavatar({
      key: "",
      num: "",
    });

    SetUserDetails({
      ...UserDetails,
      avatar: link,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUserDetails({
      ...UserDetails,
      [name]: value,
    });
  };

  const AddUser = async(Data)=>{
    
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
    await axios.post('/adduser' , Data , config).then(res=>{
        if(res.data.valid){
            navigate('/dashboard')
        }
    })
    
    }

        
    } catch (error) {
        console.log(error)
    }

  }

  const SubmitUser = (e) => {

    e.preventDefault();
    setload(true);
    AddUser(UserDetails);
    SetUserDetails({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      avatar: "",
      domain: "",
    });
  };

  return (
    <>
    {load && <Loader/>}
      <Header />

      <form className="h-[100%] ml-3 md:ml-0 mt-10 mb-10" onSubmit={SubmitUser}>
        <div className="flex flex-col md:gap-8 gap-3 md:m-5">
          <div className="flex flex-col justify-center">
            <label
              className="flex  gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="first_name"
            >
              First Name{" "}
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <label
              className="flex  gap-[0.5rem] md:gap-1  text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="last_name"
            >
              Last Name{" "}
            </label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              id="last_name"
              placeholder="Last Name"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div>
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              id="email"
              placeholder="Email"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>

          <div>
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="gender"
            >
              Gender
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="gender"
              id="gender"
              placeholder="Gender"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div>
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="avatar"
            >
              Generate Your Unique Avatar
            </label>

            <div className="flex flex-col justify-center gap-2">
              <div className="flex gap-3">
                <label className="text-gray-500">Enter some unique key</label>
                <input
                  type="text"
                  name="key"
                  value={avatardetail.key}
                  onChange={handleAvatar}
                  className="p-2 outline-none text-sm border rounded-full border-primary"
                  placeholder="a-z"
                />
              </div>
              <div className="flex gap-3">
                <label className="text-gray-500">
                  Enter some Integer from 1-9
                </label>
                <input
                  type="text"
                  onChange={handleAvatar}
                  value={avatardetail.num}
                  name="num"
                  className="p-2 outline-none text-sm border rounded-full border-primary"
                  placeholder="1-9"
                />
              </div>
            </div>
            <div className="flex justify-around md:justify-start py-2">
              <button
                onClick={Makeavatar}
                className="p-3 text-secondary rounded-full hover:text-white border border-secondary hover:bg-secondary"
              >
                Enter
              </button>
            </div>

            {/* <img src={`https://robohash.org/dolorumvlitquam.png?size=50x50&set=set6`} /> */}
            <img src={avatar} alt="genrating" />
          </div>
          <div>
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="domain"
            >
              Domain
            </label>
            <input
              type="text"
              name="domain"
              onChange={handleChange}
              id="domain"
              placeholder="Domain"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div className="flex justify-center py-5">
            <button className="md:w-[30%] p-2 md:p-4 w-[70%] rounded-xl bg-secondary text-white text-lg">
              Add User
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Adduser;
