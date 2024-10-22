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

export const POST_KANBANVIEW = (endPoint, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      return res;
    } catch (error) { }
  };
};

export const GET_KANBANVIEW = (endPoint) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};

export const GET_FILTER_KANBANVIEW = (endPoint) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;

      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};

export const UPDATE_MODULE_KANBANVIEW = (endPoint, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};
