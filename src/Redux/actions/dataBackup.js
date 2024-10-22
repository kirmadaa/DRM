import { MakeProtectedApiCall } from "../../utility/api";
import { toast } from "react-toastify";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const DATA_BACKUP_DOWNLOAD = (endPoint) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res.status === 200) {
        return res;
      } else {
       console.log("Something went wrong !")
      }
      return res;
    } catch (e) {}
  };
};

export const DATA_BACKUP_LIST = (endPoint) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res.status === 200) {
        return res?.data?.data;
      } else {
       console.log("Something went wrong !")
      }
      return res;
    } catch (e) {}
  };
};
