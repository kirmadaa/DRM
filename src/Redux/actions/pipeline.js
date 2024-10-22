import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get Pipelines
export const GET_ALL_PIPELINES = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-pipeline`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        data,
        false,
        false
      );
      if (res?.status === 200) {
        return res?.data;
      }
    } catch (error) {}
  };
};

// ** create Pipeline
export const ADD_PIPELINE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/pipeline`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) {}
  };
};

// ** Update Pipeline
export const UPDATE_PIPELINE = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/pipeline/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) {}
  };
};
// ** Delete Pipeline
export const DELETE_PIPELINE = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/pipeline-delete-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) {}
  };
};

// ** Get stages
export const GET_ALL_STAGES = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-stage`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_STAGES", data: res?.data });
        return res?.status;
      }
    } catch (error) {}
  };
};
// ** create
export const ADD_STAGE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/stage`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return res?.status;
      }
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  };
};
