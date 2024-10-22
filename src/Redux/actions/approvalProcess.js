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
export const GET_APPROVAL_PROCESS = (offse = 1, limit = 100) => {
  return async (dispatch) => {
    try {
      const data = {
        offset: offse,
        limit: limit,
      }
      const url = `${baseUrl}/search-approvalProcess`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_APPROVAL_PROCESS", data: res.data });
        return res.data;
      } else if (res?.status === 400) {
        dispatch({ type: "GET_ALL_APPROVAL_PROCESS", data: [] });
        return res.data;
      }
    } catch (error) { 
      dispatch({ type: "GET_ALL_APPROVAL_PROCESS", data: [] });
    }
  };
};

// ** Get
export const GET_APPROVAL_PROCESS_DETAILS = (id) => {
  return async (dispatch) => {
    try {

      const url = `${baseUrl}/approvalProcess-get-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_APPROVAL_PROCESS_DETAIL", data: res.data });
        return res.data;
      } else if (res?.status === 400) {
        dispatch({ type: "GET_APPROVAL_PROCESS_DETAIL", data: res.data });
        return res.data;
      }
    } catch (error) { }
  };
};



// ** create
export const CREATE_APPROVAL_PROCESS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/approvalProcess`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        return res;
      } else if (res?.status === 400) {
        return res;
      }
    } catch (error) { }
  };
};


// ** update
export const UPDATE_APPROVAL_PROCESS = (id, data) => {
  delete data?.ApprovalProcessOwnerId
  delete data?.organizationId
  delete data?._id
  delete data?.ModifiedBy
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/approvalProcess/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        return res;
      } else if (res?.status === 400) {
        return res;
      }
    } catch (error) { }
  };
};


// ** delete
export const DELETE_APPROVAL_PROCESS = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/approvalProcess-delete-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "delete", getHeaders());
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) { }
  };
};