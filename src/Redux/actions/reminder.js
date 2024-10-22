import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get lead data
export const GET_REMINDER_DATA = (api, payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
      return res?.data
    } catch (error) {
      console.log(error);
    }
  };
};