import { toast } from "react-toastify";
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const GET_ALL_AUDIT_LOG = (endPoint, offse = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/${endPoint}?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};
