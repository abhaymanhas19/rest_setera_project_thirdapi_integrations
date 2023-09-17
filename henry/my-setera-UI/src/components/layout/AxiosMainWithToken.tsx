import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AxiosMainToken = () => {
  const checkUser = useSelector((state: RootState) => state.authState.authState);
  return axios.create({
    headers: {
      Authorization: `Bearer: ${checkUser.access}`,
      "Content-Type": "application/json",
    },
    // baseURL: "http://localhost:8000/",
    baseURL: "https://xyz.weuselinux.com/" //`${process.env.REACT_APP_API_URL}` //"https://xyz.weuselinux.com/"
  });
}

export default AxiosMainToken;                      
