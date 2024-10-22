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
export const GET_WORKFLOW_LIST = (query) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-workflow`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), query);
      if (res?.status === 200) {
        dispatch({ type: "GET_API_LIST", data: res?.data?.data });
        return { data: res?.data?.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** GENRATE WORKFLOW
export const GENERATE_NEW_WORKFLOW = (data) => {
  return async () => {
    try {
      const url = `${baseUrl}/workflow`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** UPDATE WORKFLOW
export const UPDATE_WORKFLOW = (id, data) => {
  delete data?._id;
  return async () => {
    try {
      const url = `${baseUrl}/workflow/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** GET ONE WORKFLOW
export const GET_WORKFLOW_BY_ID = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/workflow-get-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_WORKFLOW_BY_ID", data: res?.data?.data });

        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** DELETE WORKFLOW
export const DELETE_WORKFLOW = (data) => {
  return async () => {
    try {
      const url = `${baseUrl}/workflow-mass-delete`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
