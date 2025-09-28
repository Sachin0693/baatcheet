import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function MessageArea() {
  let { selectedUser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <div
      className={`lg:w-[70%] w-full h-full bg-slate-300 ${
        selectedUser ? "flex" : "hidden"
      } lg:block border-l-2`}
    >
      {selectedUser && (
        <div className="w-full h-[75px] bg-[#1e6b85] rounded-b-[50px] shadow-gray-400 shadow-md flex  gap-[6px] items-center px-[20px]">
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <IoIosArrowRoundBack
              className="w-[40px] h-[40px] text-gray-200 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div
            className="w-[50px] h-[50px] bg-white rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg"
            onClick={() => navigate("/profile")}
          >
            <img src={selectedUser?.image || dp} alt="" className="h-[100%]" />
          </div>
          <h1 className="font-bold text-[20px] text-white">
            {selectedUser?.name || "user"}
          </h1>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-[25px] text-gray-700">
            Welcome to BaataCheet
          </h1>
          <span className="font-semibold text-[14px] text-gray-700">
            Chat App to connect across world ...
          </span>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
