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
export const GET_ALL_CASE_ESCALATION = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-caseEscalation`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { data: res?.data?.data, success: true };
      }
    } catch (e) {
      return { data: [], success: false };
    }
  };
};

// ** GENRATE API
export const GENRATE_NEW_CASE_ESCALATION = (data) => {
  return async () => {
    try {
      const url = `${baseUrl}/caseEscalation`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** BY ID API
export const GET_CASE_ESCALATION_BY_ID = (id) => {
  return async () => {
    try {
      const url = `${baseUrl}/caseEscalation-get-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** UPDATE API
export const UPDATE_CASE_ESCALATION = (id, data) => {
  return async () => {
    try {
      const url = `${baseUrl}/caseEscalation/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
// ** DELETE API
export const DELETE_CASE_ESCALATION = (id) => {
  return async () => {
    try {
      const url = `${baseUrl}/caseEscalation-delete-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
