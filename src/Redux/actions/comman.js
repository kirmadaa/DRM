import { MakeProtectedApiCall } from "../../utility/api";
import { toast } from "react-toastify";

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

export const GET_TIMELINE_BY_CONNECTION_ID = (connectionId) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-time-line-by-connection-id/${connectionId}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_TIMELINE_BY_CONNECTION_ID",
          data: res?.data?.data,
        });
        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const CONVERT_BY_CONNECTION_ID = (data) => {
  console.log("res==========><<<res data", data);
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/convert`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data, false, false);
      console.log("res==========><<<resErrro", res?.data?.data?.error);
      if (res.status === 200) {
        if (res?.data?.data?.error.includes("Error")) {
          toast.error(res?.data?.msg);
        } else {
          toast.success(res?.data?.msg);
        }

      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
        console.log("res==========><<<res", res);

      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const CHECK_BY_ACCOUNT_NAME = (name) => {
  console.log("name<>>>>>>>>>><<<", name);
  return async (dispatch) => {
    try {
      //const url = `${baseUrl}/convert`;
      let url = `${baseUrl}/accounts-get-by-name?name=${name}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      console.log("res<>>>>>>>>>><<<", res.data);
      // if (res.data.msg == "Request Success") {
      // }
      if (res.status === 200) {
        return res;
        //toast.success(res?.data?.msg);
        //toast.success("Please add unique account");
      } else {
        if (res?.status !== 400) {
          return res;
          //toast.error(res?.data?.msg);
        }
      }
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const GET_MODULE_INFO_BY_CONNECTION_ID = (endPoint, id) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/${endPoint}/${id}`;
      console.log("url=MakeProtectedApiCall==>", url);
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res.status === 200) {
        return res?.data;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const GET_FORM_BY_TITLE = (title) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/forms-get-by-title/${title}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const GET_DASHBOARD = (title) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/forms-get-by-titleall/${title}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      console.log("url", url, res);
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
export const GET_LIST_OF_SMS_OR_WHATS_OR_EMAIL = (endPoint, data) => {
  return async (dispatch) => {
    try {
      data["profile"] = getUserTitle();
      let url = `${baseUrl}${endPoint}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const GET_LIST_EMAIL = (limit = 50) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/get-email-temp?offset=1&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const SEND_SMS_OR_WHATS_OR_EMAIL = (endPoint, data) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}${endPoint}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** Handle get all login logs
export const GET_ALL_LOGIN_LOGS = (offset = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/login-logs?offset=${offset}&limit=${limit}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_LOGIN_LOGS",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
      } else {
        dispatch({ type: "GET_ALL_ROLE_DATA_ERROR", code: 500 });
      }
    } catch (error) {
      dispatch({ type: "GET_ALL_ROLE_DATA_ERROR", code: 500 });
    }
  };
};

export const TRACK_TOUCH = (data) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/update-tuch`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

export const CREATE_MACRO = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        toast.success("Macro created successfully");
        return res.data;
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const UPDATE_MACRO = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        toast.success("Macro updated successfully");
        return res.data;
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const GET_MACRO = (module) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro?module=${module}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_MACRO",
          data: res?.data?.data,
        });
        return res?.data;
      } else {
        dispatch({
          type: "GET_MACRO",
          data: [],
        });
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const GET_MACRO_DETAILS = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return res?.data;
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const RUN_MACRO = (id, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro/run/${id}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        toast.success(res?.data?.msg);
        window.location.reload();
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const DELETE_MACRO = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/macro/${id}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res?.status === 200) {
        toast.success(res?.data?.msg);
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const ADD_NEW_CANVAS_VIEW = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/canvas-view`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        toast.success(res?.data?.msg);
      } else {
        console.log("Something went wrong !");
      }
    } catch (error) { }
  };
};

export const GET_CANVAS_VIEW = (module) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-canvas-view?moduleTitle=${module}`;
      console.log("url===>", url);
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          console.log("Something went wrong !");
        }
      }
    } catch (error) { }
  };
};

export const ADD_INVENTORY_FOR_OPPORTUNITY = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/deal-inventory`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return res;
      } else {
        if (res?.status !== 400) {
          console.log("Something went wrong !");
        }
      }
    } catch (error) { }
  };
};
export const GET_INVENTORY_FOR_OPPORTUNITY = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-deal-inventory/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_INVENTORY_FOR_OPPORTUNITY", data: res?.data });
        return res;
      } else {
        if (res?.status !== 400) {
          console.log("Something went wrong !");
        }
      }
    } catch (error) { }
  };
};

export const GET_SITEVISIT_FOR_OPPORTUNITY = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-deal-inventory/${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_INVENTORY_FOR_OPPORTUNITY", data: res?.data });
        return res;
      } else {
        if (res?.status !== 400) {
          console.log("Something went wrong !");
        }
      }
    } catch (error) { }
  };
};
