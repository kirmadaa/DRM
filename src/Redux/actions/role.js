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

// ** Handle get all data
export const GET_ALL_ROLE_DATA = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${"role"}?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_ALL_ROLE_DATA",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
      } else {
        handleError(dispatch, res, "GET_ALL_ROLE_DATA_ERROR");
      }
    } catch (error) {
      dispatch({ type: "GET_ALL_ROLE_DATA_ERROR", code: 500 });
    }
  };
};

export const GET_ALL_DATA = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${"role"}?offset=${1}&limit=${50}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_ALL_DATA",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res.data.data;
      } else {
        handleError(dispatch, res, "GET_ALL_DATA_ERROR");
      }
    } catch (error) { }
  };
};

export const GET_ROLE_BY_ID_DATA = (id) => {
  return async (dispatch) => {
    dispatch({ type: "GET_ROLE_BY_ID_DATA_LOADING" });
    try {
      const url = `${baseUrl}/get-role-byid/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_ROLE_BY_ID_DATA", data: res.data.data });
        return res?.data?.data;
      } else {
        handleError(dispatch, res, "GET_ROLE_BY_ID_DATA_ERROR");
      }
    } catch (error) { }
  };
};

export const UPDATE_ROLE_DATA = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/role`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "UPDATE_ROLE_DATA",
          data: res?.data,
          pagination: res?.data?.pagination,
        });
        return res?.status;
      }
    } catch (error) { }
  };
};

export const CREATE_ROLE_DATA = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/role`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CREATE_ROLE_DATA",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res?.status;
      }
    } catch (error) { }
  };
};
