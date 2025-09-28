import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { setOtherUser, setSelectedUser, setUserdata } from "../redux/userSlice";

function SideBar() {
  let { userData, otherUsers,selectedUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserdata(null));
      dispatch(setOtherUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={` lg:w-[30%] lg:block w-full h-full bg-slate-200 ${!selectedUser?"block":"hidden"}`}>
      <div
        className={`w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-[#20c7ff] mt-2 cursor-pointer fixed bottom-[20px] left-[20px]`}
        onClick={handleLogout}
      >
        <TbLogout />
      </div>
      <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-md flex flex-col gap-[6px] justify-center px-[20px]">
        <h1 className="text-white font-bold text-[18px]">BaataCheet</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-[20px] text-gray-700">
            Welcome {userData.name || User}
          </h1>
          <div
            className="w-[50px] h-[50px] bg-white rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg"
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[20px]">
          {!search && (
            <div
              className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-white mt-2 cursor-pointer"
              onClick={() => {
                setSearch(true);
              }}
            >
              <IoSearch />
            </div>
          )}
          {search && (
            <form className="w-full h-[40px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] rounded-full overflow-hidden mt-2 px-[10px]">
              <IoSearch />
              <input
                type="text "
                placeholder="Search users..."
                className="w-full h-full p-[2px] border-0 outline-0 text-[16px] text-gray-600 align-middle"
              />
              <RxCross2
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={() => {
                  setSearch(false);
                }}
              />
            </form>
          )}
          {!search &&
            otherUsers?.map((user) => (
              <div className="w-[45px] h-[45px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg">
                <img src={user.image || dp} alt="" className="h-[100%]" />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-[60vh] flex flex-col overflow-auto gap-[10px] items-center mt-[10px]">
        {otherUsers?.map((user) => (
          <div
            className="w-[95%] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-start items-center shadow-gray-500 shadow-lg gap-[10px] bg-white hover:bg-[#c7daf5] cursor-pointer"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="w-[45px] h-[45px] ml-[10px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg">
              <img src={user.image || dp} alt="" className="h-[100%]" />
            </div>
            <h1 className="font-semibold text-[16px] text-gray-700">
              {user.name || user.username}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
