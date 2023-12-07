import axios from "axios";
import Header from "../Header/Header"
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const EditUser = ()=>{
   const [load,setload] = useState(false);
      const id = useParams();
     const navigate = useNavigate();
    const [UserDetails, SetUserDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        avatar: "",
        domain: "",
        available: true,
      });
    const [avatar, setavatar] = useState("");
    const [avatardetail, Setavatar] = useState({
        key: "",
        num: "",
      });
    const handleAvatar = (e) => {
      const { name, value } = e.target;
      Setavatar({
        ...avatardetail,
        [name]: value,
      });
      
    };
    const Makeavatar = (e) => {
      e.preventDefault();
      const link =
        "https://robohash.org/dolor" +
        avatardetail.key +
        "umvlitquam.png?size=50x50&set=set" +
        avatardetail.num;
      setavatar(link);
      SetUserDetails({
        ...UserDetails , avatar:link
      })
      Setavatar({
        key: "",
        num: "",
      });
    }

    const handleChange = (e)=>{
        const { name, value } = e.target;
        SetUserDetails({
          ...UserDetails,
          [name]: value,
        });
    }

    const getData = async()=>{
     
          const link = '/getuserid/'+id.id;
          try {
              await axios.get(link).then(res=>{
                  if(res.data.valid){
                      SetUserDetails(res.data.user);
                  }
              })
              
          } catch (error) {
              console.log(error);
          }
        
       

    }

    useEffect(()=>{
       getData()
    },[]);

    const UpdateUser = async()=>{
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
              const link = '/updateid/'+id.id;
              await axios.post(link , UserDetails , config).then(res=>{
                  if(res.data.valid){
                      navigate('/dashboard')
                  }
              })
            }
           
            
        } catch (error) {
            console.log(error)
        }
    }

    const EditUser = (e)=>{
        e.preventDefault();
        setload(true);
        UpdateUser(UserDetails)

    }

    return (
        <>
        {load && <Loader/>}
        <Header/>
        <form className="h-[100%] ml-3 md:ml-0 mt-10 mb-10" onSubmit={EditUser} >
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
              value={UserDetails.first_name}
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
              value={UserDetails.last_name}
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
              value={UserDetails.email}
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
              value={UserDetails.gender}
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
            <img src={UserDetails.avatar} alt="genrating" />
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
              value={UserDetails.domain}
              placeholder="Domain"
              className="w-1/2 outline-none border border-gray-400 p-1 md:p-4 md:text-xl md:placeholder:text-xl placeholder:text-sm rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <label
              className="flex gap-[0.5rem]  md:gap-1 text-gray-700 text-sm md:text-2xl md:font-bolder font-bold mb-2 "
              htmlFor="available"
            >
              Available
            </label>
           <select name="available" onChange={handleChange} className="outline-none cursor-pointer border border-gray-500 p-3 text-lg rounded-full" value={UserDetails.available}>
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>

           </select>
          </div>
          <div className="flex justify-center py-5">
            <button className="md:w-[30%] p-2 md:p-4 w-[70%] rounded-xl bg-secondary text-white text-lg">
              Edit User
            </button>
          </div>
        </div>
      </form>
     
        </>
    )


}


export default EditUser