import { React, useState } from "react";
import dp from "../assets/dp.webp";
import { MdCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { serverUrl } from "../main";
import { setUserdata } from "../redux/userSlice";
import axios from "axios";

function Profile() {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState(userData.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  const [saving, setSaving] = useState(false);
  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserdata(result.data));
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-4">
      <div className="fixed top-[20px] left-[20px] ">
        <MdArrowBackIosNew
          className="w-[20px] h-[20px] text-gray-600 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div
        className="rounded-full bg-white border-2 border-[#20c7ff] shadow-gray-400 shadow-lg relative"
        onClick={() => image.current.click()}
      >
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">
          <img src={frontendImage} alt="" className="h-[100%]" />
        </div>
        <MdCameraAlt className="text-gray-700 absolute bottom-8 right-2 w-[25px] h-[25px]" />
      </div>
      <form
        className="w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder="Enter your name"
          className="w-[85%] h-[40px] outline-none border-2 border-[#20c7ff] px-[10px] bg-white rounded-lg shadow-gray-400 shadow-md"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          className="w-[85%] h-[40px] outline-none border-2 border-[#20c7ff] px-[10px] bg-white rounded-lg shadow-gray-400 shadow-md text-gray-400"
          value={userData?.username}
          readOnly
        />
        <input
          type="email"
          className="w-[85%] h-[40px] outline-none border-2 border-[#20c7ff] px-[10px] bg-white rounded-lg shadow-gray-400 shadow-md text-gray-400"
          value={userData?.email}
          readOnly
        />
        <button
          className="px-[20px] py-[8px] bg-[#20c7ff] rounded-xl shadow-gray-400 shadow-lg w-[130px] mt-4 font-semibold hover:shadow-inner"
          disabled={saving}
        >
          {saving ? "Saving...." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
