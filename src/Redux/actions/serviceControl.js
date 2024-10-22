import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const SERVICE_CONTROL_ACTIVE_INACTIVE = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/active-inactive-service`;
      const res = await MakeProtectedApiCall(
        url,
        "patch",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        dispatch({ type: "SERVICE_CONTROL_ACTIVE_INACTIVE", data: res.data });
      }
    } catch (error) {}
  };
};

export const ADD_EMAIL_TEMPLATE = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/add-email-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
    } catch (error) {}
  };
};

export const GET_TEMPLATE_EMAIL_LIST = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-get-email-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        dispatch({ type: "GET_TEMPLATE_EMAIL_LIST", data: res.data });
        return res.data;
      } else {
        dispatch({ type: "GET_TEMPLATE_EMAIL_LIST", data: res });
      }
    } catch (error) {}
  };
};

export const ADD_SMS_TEMPLATE = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/add-sms-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
    } catch (error) {}
  };
};

export const GET_TEMPLATE_SMS_LIST = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-get-sms-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        dispatch({ type: "GET_TEMPLATE_SMS_LIST", data: res.data });
      }
    } catch (error) {}
  };
};

export const ADD_WHATSAPP_TEMPLATE = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/add-whatsapp-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
    } catch (error) {}
  };
};

export const GET_TEMPLATE_WHATSAPP_LIST = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/search-get-whatsapp-temp`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        dispatch({ type: "GET_TEMPLATE_WHATSAPP_LIST", data: res.data });
      }
    } catch (error) {}
  };
};

export const UPDATE_TEMPLATE_SMS = (payload, id) => {
  return async () => {
    try {
      const url = `${baseUrl}/update-sms-temp/${id}`;
      const res = await MakeProtectedApiCall(
        url,
        "PATCH",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
      return false;
    } catch (error) {}
  };
};

export const UPDATE_TEMPLATE_WHATSAPP = (payload, id) => {
  return async () => {
    try {
      const url = `${baseUrl}/update-whatsapp-temp/${id}`;
      const res = await MakeProtectedApiCall(
        url,
        "PATCH",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
      return false;
    } catch (error) {}
  };
};

export const UPDATE_TEMPLATE_EMAIL = (payload, id) => {
  return async () => {
    try {
      const url = `${baseUrl}/update-email-temp/${id}`;
      const res = await MakeProtectedApiCall(
        url,
        "PATCH",
        getHeaders(),
        payload
      );
      if (res?.status === 200) {
        return true;
      }
      return false;
    } catch (error) {}
  };
};

export const DELETE_TEMPLATE = (endPoint) => {
  return async () => {
    try {
      const url = `${baseUrl}${endPoint}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res?.status === 200) {
        return true;
      }
      return false;
    } catch (error) {}
  };
};
