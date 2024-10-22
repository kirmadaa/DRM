import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get
export const GET_ASSIGNMENT_RULE = (offse = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/get-assignmentrule-list`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {});
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_ASSIGNMENT_RULES", data: res.data });
        return res;
      } else if (res?.status === 400) {
        dispatch({ type: "GET_ALL_ASSIGNMENT_RULES", data: res.data });
        return res;
      }
    } catch (error) { 
      dispatch({ type: "GET_ALL_ASSIGNMENT_RULES", data: [] });
    }
  };
};



// ** create
export const CREATE_ASSIGNMENT_RULE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/assignmentrule`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};

// ** update
export const UPDATE_ASSIGNMENT_RULE = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/update-assignmentrule/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};


// ** update
export const DELETE_ASSIGNMENT_RULE = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/assignmentrule-delete-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "delete", getHeaders());
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};