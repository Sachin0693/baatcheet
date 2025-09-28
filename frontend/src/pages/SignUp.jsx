import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice.js";

function SignUp() {
  let navigate = useNavigate();
  const [Show, setShow] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");
  let dispatch = useDispatch();
  const handleSignup = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      dispatch(setUserdata(result.data))
      navigate("/profile")
      setloading(false);
      setemail("");
      setpassword("");
      if (result.status === 201) {
        navigate("/login"); // Redirect after signup success
      }
      console.log(result);
      seterr("")
    } catch (error) {
      setloading(false);
      console.log(error.response?.data?.message || "Signup failed");
      alert(error.response?.data?.message || "Signup failed");
      seterr(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex justify-center items-center">
      <div className="w-full max-w-[360px] h-[450px] bg-white rounded-lg shadow-gray-400 shadow-lg">
        <div className="w-full h-[120px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-md flex justify-center items-center">
          <h1 className="text-gray-500 font-bold text-[20px]">
            Welcome to <span className="text-white">BaataCheet</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-[20px] items-center mt-8"
          onSubmit={handleSignup}
        >
          <input
            type="text"
            placeholder="username"
            className="w-[85%] h-[40px] outline-none border-2 border-[#20c7ff] px-[10px] bg-white rounded-lg shadow-gray-400 shadow-md"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            className="w-[85%] h-[40px] outline-none border-2 border-[#20c7ff] px-[10px] bg-white rounded-lg shadow-gray-400 shadow-md"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div className="w-[85%] h-[40px] border-2 border-[#20c7ff] rounded-lg shadow-gray-400 shadow-md overflow-hidden relative">
            <input
              type={`${Show ? "text" : "password"}`}
              placeholder="password"
              className="w-full h-full outline-none px-[10px] bg-white "
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <span
              className="absolute top-[7px] right-[10px] text-sm text-[#20c7ff] font-semibold cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >{`${Show ? "hidden" : "show"}`}</span>
          </div>
          {err && <p className="text-red-800">{err}</p>}
          <button className="px-[20px] py-[8px] bg-[#20c7ff] rounded-xl shadow-gray-400 shadow-lg w-[100px] mt-4 font-semibold hover:shadow-inner" disabled={loading}>
            {loading ? "loading..." : "Signup"}
          </button>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already Have An Account ?{" "}
            <span className="text-[#20c7ff] font-bold text-sm">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
