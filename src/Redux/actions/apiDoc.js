
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Handle get all data
export const GET_API_LIST = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/api`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_API_LIST", data: res?.data?.data });
      }
    } catch (e) {
    }
  };
}

// ** GENRATE API 
export const GENRATE_NEW_API = (data) => {
  return async () => {
    try {
      const url = `${baseUrl}/api`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
    }
  };
};