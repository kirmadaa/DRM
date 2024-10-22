import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const getUserTitle = () => {
  return JSON.parse(localStorage.getItem("userData"))?.userData?.profile;
};
const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get lead data
export const GET_ALL_DATA_QUOTES = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/quotes?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_QUOTES", data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_ALL_DATA_FILTER_QUOTES = (payload) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", data: true });

    try {
      payload["profile"] = getUserTitle();
      const url = `${baseUrl}/search-quotes`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );

      console.log("res?.status", url, payload);

      if (res?.status === 200) {
        dispatch({ type: "GET_ALL_DATA_FILTER_QUOTES", data: res.data });
        dispatch({ type: "LOADING", data: false });

        return res?.data?.data;
      } else if (res?.status === 400) {
        dispatch({ type: "NULL_ALL_DATA_FILTER_QUOTES" });
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
      const url = `${baseUrl}/quotes-get-by-id/${id}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_DATA_BY_ID_SaleOrder", data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ** Create lead data
export const CREATE__DATA_SaleOrder = (data) => {
  delete data?.id;
  delete data?._id;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/quotes`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "CREATE__DATA_SaleOrder", data: res.data });
      }
    } catch (error) {
      console.log(error);
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
      const url = `${baseUrl}/quotes/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "UPDATE__DATA_SaleOrder", data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// ** Get filter lead
export const GET_FILTERS_SaleOrder = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-quotes-filter-field`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_FILTERS_SaleOrder", data: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const RESET_STATE_SaleOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "RESET_STATE_SaleOrder" });
    } catch (error) {
      console.log(error);
    }
  };
};
