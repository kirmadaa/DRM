import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;
const getUserTitle = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData?.profile;
};
// ** Get lead data
export const GET_ALL_DATA_SaleOrder = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sale-orders?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_SaleOrder", data: res.data });
        return res?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_ALL_DATA_FILTER_SaleOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", data: true });
    try {
      payload["profile"] = getUserTitle();
      const url = `${baseUrl}/search-sale-orders`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_FILTER_SaleOrder", data: res.data });
        dispatch({ type: "LOADING", data: false });
        return res?.data?.data;
      } else if (res?.status === 400) {
        dispatch({ type: "NULL_ALL_DATA_FILTER_SaleOrder" });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "LOADING", data: false });
  };
};

// ** get lead data by id
export const GET_DATA_BY_ID_SaleOrder = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sale-orders-get-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_DATA_BY_ID_SaleOrder", data: res.data });
      }
    } catch (error) { }
  };
};

// ** Create lead data
export const CREATE__DATA_SaleOrder = (data) => {
  delete data?.id;
  delete data?._id;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sale-orders`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_FILTER_SaleOrder", data: res.data });
      }
    } catch (error) {
      console.error("error<======>>>>>", error)
    }
  };
};

// ** Update lead data
export const UPDATE__DATA_SaleOrder = (data) => {
  const id = data._id;
  delete data._id;
  delete data.orgna;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sale-orders/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "UPDATE__DATA_SaleOrder", data: res.data });
      }
    } catch (error) { }
  };
};

// ** Get filter lead
export const GET_FILTERS_SaleOrder = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-sale-orders-filter-field`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_FILTERS_SaleOrder", data: res.data });
      }
    } catch (error) { }
  };
};
export const RESET_STATE_SaleOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "RESET_STATE_SaleOrder" });
    } catch (error) { }
  };
};
