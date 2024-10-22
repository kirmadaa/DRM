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
export const GET_CUSTOMIZATION_DASHBOARD = (offse = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/home-customization`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders(), {});
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_CUSTOMIZATION_DASHBOARD", data: res.data });
        return res.data;
      } else if (res?.status === 400) {
        dispatch({ type: "GET_ALL_CUSTOMIZATION_DASHBOARD", data: res.data });
        return res.data;
      }
    } catch (error) { }
  };
};



export const GET_CUSTOMIZATION_DASHBOARD_DETAILS = (id) => {
  return async (dispatch) => {
    try {

      const url = `${baseUrl}/home-customization/${id}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders(), {});
      if (res?.status === 200) {
        dispatch({ type: "GET_CUSTOMIZATION_DASHBOARD_DETAIL", data: res.data });
        return res;
      } else if (res?.status === 400) {
        dispatch({ type: "SET_DASHBOARD_CUSTOMIZATION", data: res.data });
        return res;
      }
    } catch (error) { }
  };
};



// ** create
export const CREATE_CUSTOMIZATION_DASHBOARD = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/home-customization`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};

// ** update
export const UPDATE_CUSTOMIZATION_DASHBOARD = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/home-customization/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};


// ** update
export const DELETE_CUSTOMIZATION_DASHBOARD = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/home-customization/${id}`;
      const res = await MakeProtectedApiCall(url, "delete", getHeaders());
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};