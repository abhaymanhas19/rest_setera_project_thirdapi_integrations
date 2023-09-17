import axios from "axios";
import Swal from "sweetalert2";
import { store } from "../../redux/store";

const AxiosMain = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

AxiosMain.interceptors.request.use(function (config) {
  // Do something before request is sent
  const superUerOrg = store.getState().appState.appOrg;
  const UserData = store.getState().authState.authState;
  if (config.url !== "/otp-verify/" && config.url !== "/mobile-otp/" && config.url !== "/login/") {
    if (Object.keys(UserData).length > 0) {
      if (Object.keys(superUerOrg).length > 0) {
        config.headers.organization = superUerOrg.id;
      } else {
        config.headers.organization = UserData.user.organization;
      }

    }
    else {
      config.headers.organization = null;
      throw new axios.Cancel('Organization Not Found!');
    }
  }
  return config
}, function (error) {
  // Do something with request error
  console.log("Request Error ", error)
  return Promise.reject(error);
});
AxiosMain.interceptors.response.use(function (response) {
  //console.log("Main API Route Response ", { url: response.config.url, status: response.status, data: response.data });
  return response;
}, function (error) {
  console.log("Main API Route Error", { url: error.config.url, message: error.message, alldata: error });
  if (error.message === 'Organization Not Found!') {
    showErrorData(error.message);
  }
  return Promise.reject(error);
});

const showErrorData = (val: any) => {
  Swal.fire({
    title: "Error",
    text: val,
    icon: "error"
  })
}
export default AxiosMain;                      