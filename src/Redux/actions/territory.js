import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

const handleError = (dispatch, res, type) => {
  if (res?.status === 404 || res?.status === 500) {
    dispatch({ type: type, code: res?.status });
  } else {
    dispatch({ type: type, code: 500 });
  }
};


// ** Get
export const GET_TERRITORY = (offse = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/territories?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_TERRITORY", data: res.data });
        return res;
      }
    } catch (error) { }
  };
};



// ** create
export const CREATE_TERRITORY = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/territories`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};

// ** update
export const UPDATE_TERRITORY = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/territories/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};


// ** update
export const DELETE_TERRITORY = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/territories/${id}`;
      const res = await MakeProtectedApiCall(url, "delete", getHeaders());
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};