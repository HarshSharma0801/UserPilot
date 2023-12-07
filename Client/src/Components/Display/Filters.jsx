import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Filters = (props) => {
  const [apply, Setapply] = useState(false);
  const [load , setload] = useState(false);
  const [filters, Setfilters] = useState({
    availible: "",
    domain: "",
    gender: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    Setfilters({
      ...filters,
      [name]: value,
    });
  };

  const Applied = () => {
    Setapply((prev) => {
      return !prev;
    });
  };

  const FilterApi = async()=>{
    try {
       
        await axios.get('/user/filtered' , {
            params:{
              filters:filters
            }
          }).then(res=>{
               if(res.data.valid){
                props.GetFiltered(res.data.users);
                setload(false);
              }
               else{
               Setapply(false);
               }
          })
        
    } catch (error) {
        console.log(error);
    }
  }

  const ApplyFilters = ()=>{
    setload(true);
    FilterApi();
    Setfilters({
        available: '',
        domain: '',
        gender: '',
      })
  
  }

  return (
    <>
    {load && <Loader/>}
        
        <div className="flex flex-col justify-center pt-2 md:py-2 w-[80%] md:w-[35%] rounded-xl bg-secondary text-white gap-2">
          <div className="flex justify-center">
            <div className="flex gap-2 font-bold">
              <div>
                <h1 className="md:text-xl text-lg">Filters</h1>
              </div>

              <div className="cursor-pointer" onClick={Applied}>
                {apply ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {apply && (
            <div className="flex justify-center flex-col gap-2 md:py-0 py-1 text-bold">
              <div className="flex justify-center gap-3 md:gap-8">
                <div>
                  <h1 className="flex gap-1">
                    Availability{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
                      />
                    </svg>
                  </h1>
                </div>
                <div>
                  <select
                    name="available"
                    id="countries"
                    onChange={handlechange}
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 "
                  >
                    <option selected>Choose</option>
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center gap-3 md:gap-8">
                <div>
                  <h1 className="flex gap-1">
                    Domain{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
                      />
                    </svg>
                  </h1>
                </div>
                <div>
                  <input
                    onChange={handlechange}
                    name="domain"
                    type="text"
                    placeholder="type domain"
                    className="text-black px-1.5 p-1 text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-3 md:gap-8">
                <div>
                  <h1 className="flex gap-1">
                    Gender{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
                      />
                    </svg>
                  </h1>
                </div>
                <div>
                  <input
                    name="gender"
                    type="text"
                    onChange={handlechange}
                    placeholder="type gender"
                    className="text-black px-1.5 p-1 text-sm rounded-2xl outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-center py-2">
                <button
                  onClick={() => {
                    Setapply(false);
                    ApplyFilters();
                  }}
                  className="bg-white rounded-xl border border-primary hover:bg-primary hover:text-white text-primary p-2"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
     
    </>
  );
};

export default Filters;
