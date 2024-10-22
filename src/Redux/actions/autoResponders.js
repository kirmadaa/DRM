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

export const POST_AUTO_RESPONDERS = (endPoint, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      return res;
    } catch (error) {}
  };
};

export const GET_AUTO_RESPONDERS = (endPoint, filter) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), filter);
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};

export const GET_BYID_DATA_AUTO_RESPONDERS = (endPoint) => {
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

export const PATCH_AUTO_RESPONDERS = (endpPoint, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endpPoint}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        return res;
      }
    } catch (error) {}
  };
};

export const DELETE_AUTO_RESPONDERS = (endpPoint, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${endpPoint}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders(), data);
      if (res?.status === 200) {
        return res;
      }
    } catch (error) {}
  };
};
