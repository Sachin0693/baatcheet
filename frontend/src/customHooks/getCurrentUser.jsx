import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice.js";

const getCurrentUser = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserdata(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};
export default getCurrentUser;
