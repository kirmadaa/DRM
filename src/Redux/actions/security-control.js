import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get lead data
export const GET_ALL_SECURITY_PROFILE = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      // dispatch({type:"GETSECURITYPROFILE_LOADING"})
      const url = `${baseUrl}/permission-profile?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_SECURITY_PROFILE_FULL_FILL", data: res.data.data });
        return res;
      }
    } catch (error) { }
  };
};

export const GET_ALLDATA_PROFILE = (offset = 1, limit = 100) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/permission-profile?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_SECURITY_PROFILE_FULL_FILL", data: res.data.data });
        return res;
      }
    } catch (error) { }
  };
};

export const GET_BY_ID_SECURITY_PROFILE = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-permission-profile-byid/${id}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_BY_ID_SECURITY_PROFILE", data: res.data });
        return res.data;
      }
    } catch (error) { }
  };
};

// ** Create lead data
export const CREATE_SECURITY_PROFILE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/permission-profile`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "CREATE_SECURITY_PROFILE", data: res.data });
        return res;
      }
    } catch (error) { }
  };
};

// ** Update data sharing permissions
export const UPDATE_DATA_SHARING_PERMISSIONS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/permission-rule`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Create rule sharing permissions
export const CREATE_RULE_SHARING_PERMISSIONS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/share-rule`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Update rule sharing permissions
export const UPDATE_RULE_SHARING_PERMISSIONS = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/update-share-rule/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Delete rule sharing permissions
export const DELETE_RULE_SHARING_PERMISSIONS = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/delete-share-rule/${id}`;
      const res = await MakeProtectedApiCall(url, "delete", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Get rule sharing permissions
export const GET_RULE_SHARING_PERMISSIONS = (
  module,
  offset = 1,
  limit = 100
) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-share-rule?moduleTitle=${module}&offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Get data sharing permissions
export const GET_DATA_SHARING_PERMISSIONS = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/permission-get-by-id`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: 'GET_DATA_SHARING_PERMISSIONS', data: res?.data?.data })
        return res;
      }
    } catch (error) { }
  };
};

// ** Update security data
export const UPDATE_SECURITY_PROFILE = (data) => {
  const id = data._id;
  delete data._id;
  delete data.orgna;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/permission-profile`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        return res;
      }
    } catch (error) { }
  };
};

// ** Update security data
export const CHECK_PERMISSIONS = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/check-permission`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "CHECK_PERMISSIONS", data: res.data });
        return res;
      }
    } catch (error) { }
  };
};
