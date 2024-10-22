import { toast } from "react-toastify";
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const getHeadersForFile = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "Content-type": "multipart/form-date",
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

export const getProfile = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    dispatch({ type: "GETPROFILE_PENDING" });
    try {
      const url = `${baseUrl}/${"profile"}?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GETPROFILE_FULLFILL",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
      } else {
        handleError(dispatch, res, "GETPROFILE_REJECTED");
      }
    } catch (error) {
      dispatch({ type: "GETPROFILE_REJECTED", code: 500 });
    }
  };
};

export const createprofile = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/create-user`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data, true);
      if (res?.status === 200) {
        dispatch({
          type: "CREATEPROFILE_FULLFILLED",
          data: res?.data?.data,
        });
        return res?.status;
      }
    } catch (error) {
      console.log(error)
    }
  };
};

export const CREATE_GROUP = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/group`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        // toast.success('Group created successfully');
      } else {
        console.log("Something went wrong !")
      }
      return res;
    } catch (error) { }
  };
};

export const UPDATE_GROUP = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/group/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        // toast.success('Group updated successfully');
      } else {
        console.log("Something went wrong !")
      }
      return res;
    } catch (error) { }
  };
};

export const GET_GROUP_LIST = (offse = 1, limit = 10, str = "") => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/group?offset=${offset}&limit=${limit}&groupTitle=${str}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GETGROUPLIST_FULLFILLED",
          data: res?.data?.data,
          pagination: res?.data?.data.pagination,
        });
        return res?.data?.data;
      } else {
        console.log("Something went wrong !")
      }
    } catch (error) {
      console.log("make error", error);
      toast.error("Something went wrong !");
    }
  };
};

export const getUserList = (data) => {
  return async (dispatch) => {
    dispatch({ type: "GETUSERLIST_PENDING" });
    try {
      let url;
      if ("active" in data) {
        url = `${baseUrl}/get-user?offset=${data?.page}&limit=${data?.limit
          }&str=${data.str ? data.str : ""}&active=${data.active}&userlist=true`;
        if ("userlist" in data) {
          url = `${baseUrl}/get-user?offset=${data?.page}&limit=${data?.limit
            }&str=${data.str ? data.str : ""}&active=${data.active}&userlist=true`;
        }
      } else {
        url = `${baseUrl}/get-user?offset=${data?.page}&limit=${data?.limit
          }&str=${data.str ? data.str : ""}&active=true&userlist=true`;
        if ("userlist" in data) {
          url = `${baseUrl}/get-user?offset=${data?.page}&limit=${data?.limit
            }&str=${data.str ? data.str : ""}&userlist=true`;
        }
      }

      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GETUSERLIST_FULLFILLED",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res?.data?.data;
      } else {
        handleError(dispatch, res, "GETUSERLIST_ERROR");
      }
    } catch (error) {
      dispatch({ type: "GETUSERLIST_ERROR", code: 500 });
    }
  };
};

export const UPDATE_USER_PROFILE_IMG = (formdata) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/add-profile-img`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), formdata);
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};

export const GET_ALL_ACTIVE_USER = (endPoint, offse = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const offset = offse < 1 ? 1 : offse;
      const url = `${baseUrl}/${endPoint}&offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res) {
        return res;
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
};
export const getAllActiveDeactive = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/active-inactive-user`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "ALL_ACTIVE_DEACTIVE",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res?.data?.data;
      }
    } catch (error) { }
  };
};
export const updateSubUserProfile = (userId, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/update-user/${userId}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data, true);
      if (res?.status === 200) {
        dispatch({
          type: "UPDATEUSERLIST_FULLFILLED",
          data: res?.data,
          pagination: res?.data?.pagination,
        });
        return res?.status;
      }
    } catch (error) { }
  };
};
export const activeActionUser = (data) => {
  return async (dispatch) => {
    try {
      const userId = data?._id;
      delete data?._id;
      const url = `${baseUrl}/active-user/${userId}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "ACTIVEINACTIVEUSER_SUCCESS",
          data: res?.data,
        });
        return res?.status;
      }
    } catch (error) { }
  };
};
