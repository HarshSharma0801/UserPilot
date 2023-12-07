import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TeamActions } from "../Context/Reducers/TeamContext";
const DisplayCard = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (props.available) {
      const newMember = {
        id: props.id,
        avatar: props.avatar,
        firstName: props.first_name,
        lastName: props.last_name,
        gender: props.gender,
        domain: props.domain,
      };
      dispatch(TeamActions.AddtoTeam(newMember));
      setIsClicked(!isClicked);
      setTimeout(() => {
        setIsClicked(false);
      }, 400);
    } else {
      setIsClicked(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`p-2 flex cursor-pointer flex-col gap-1 bg-test shadow-lg rounded-2xl border-2 transition-transform transform ${
          isClicked ? "scale-110" : "scale-100"
        }`}
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
        </div>
      </div>
    </>
  );
};

export default DisplayCard;
