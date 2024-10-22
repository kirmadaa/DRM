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

// ** Get User profile
export const GET_USER_PROFILE = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/profile`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) { }
  };
};

export const GET_USER_PROFILE_BY_ID = (id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/profile:${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) { }
  };
};
export const UPDATE_USER_GOOGLE_CALANDER_TOKEN = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/add-google-calendar`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) { }
  };
};

// ** Update User data
export const UPDATE_USER_PROFILE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/profile`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) { }
  };
};

// ** Handle get all data
export const GET_ALL_DATA = (offset = 1, limit = 10, api) => {
  let filter = {
    offset: offset,
    limit: limit,
    buttonType: "All",
    profile: "Administrator"
  };

  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(
        url,
        "Post",
        getHeaders(),
        filter,
        false,
        false
      );
      if (res?.status === 200) {
        dispatch({
          type: "GET_ALL_DATA",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res?.data?.data;
      } else if (res?.status === 400) {
        dispatch({
          type: "NULL_ALL_DATA_FILTER",
        });
      }
    } catch (error) { }
  };
};
export const GET_ALL_DATA_FILTER = (api, payload, mass) => {
  return async (dispatch) => {
    try {
      if (mass) {
        payload["mass"] = mass;
      }
      payload["profile"] = getUserTitle();
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        payload,
        false,
        false
      );
      if (res?.status === 200) {
        dispatch({
          type: "GET_ALL_DATA_FILTER",
          data: res?.data?.data,
          pagination: res?.data?.pagination,
        });
        return res?.data?.data;
      } else if (res?.status === 400) {
        dispatch({
          type: "GET_ALL_DATA_FILTER",
          data: [],
          pagination: res?.data?.pagination,
        });
        return { data: res?.data?.data };
      }
    } catch (error) { }
  };
};
// ** Handle get GET_TABLE_HEADER
export const GET_TABLE_HEADER = (api) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      console.log("url res===>", url, res);
      if (res?.status === 200) {
        dispatch({ type: "GET_TABLE_HEADER", data: res?.data?.data });
        return res?.data?.data;
      }
    } catch (error) { }
  };
};
// ** Handle get GET_FILTERS
export const GET_FILTERS = (api) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        console.log("res?.data?.data ==>>", res?.data?.data);
        dispatch({ type: "GET_FILTERS", data: res?.data?.data });
        return { data: res?.data?.data };
      } else if (res?.status === 400) {
        dispatch({ type: "GET_FILTERS", data: [] });
        return { data: res?.data?.data };
      }
    } catch (error) { }
  };
};
// ** Handle get GET_DETAIL
export const GET_DETAIL = (api, id) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}${id}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      // console.log("resres==>", res, url)
      if (res?.status === 200) {
        dispatch({ type: "GET_DETAIL", data: res?.data });
        return res?.data;
      }
    } catch (error) { }
  };
};
// ** Handle get SET_LOADER
export const SET_LOADER = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADER", data: data });
    } catch (error) { }
  };
};

export const GET_FORM_CONVERT = (api) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      // dispatch({ type: "LOADING", data: true });
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      console.log("GET_FORM", res, url);
      if (res?.status === 200) {
        dispatch({ type: "GET_FORM", data: res?.data?.data });
        dispatch({ type: "LOADING", data: false });
        return res?.data?.data;
      }
    } catch (error) { }
    dispatch({ type: "LOADING", data: false });
  };
};
export const GET_FORM = (api) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", data: true });

    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      console.log("GET_FORM", res, url);
      if (res?.status === 200) {
        dispatch({ type: "GET_FORM", data: res?.data?.data });
        dispatch({ type: "LOADING", data: false });
        return res?.data?.data;
      } else {
        dispatch({ type: "LOADING", data: false });
      }
    } catch (error) { }
    dispatch({ type: "LOADING", data: false });
  };
};
export const RESET_STATE = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "RESET_STATE" });
    } catch (error) { }
  };
};
export const SAVE_VIEWS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/views`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({ type: "SAVE_VIEWS", data: res });
      }
    } catch (error) { }
  };
};

export const UPDATE_VIEWS = (data) => {
  const id = data?.id;
  delete data?.id;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/views/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "UPDATE_VIEWS", data: res });
      }
    } catch (error) { }
  };
};
export const SAVE = (api, data, redriect = false) => {
  // console.log("api, data", api, data);
  delete data?.id;
  delete data?._id;
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;

      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "SAVE", data: res, redriect });
        return true;
      } else if (res?.status === 400) {
        alert(JSON.stringify(res?.message));

        // dispatch({ type: "SAVE", data: null, redriect });
        // return true;
      }
      return false;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
};

export const addNotes = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sticky-note`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        ...data,
      });
      if (res?.status === 200) {
        dispatch({ type: "SAVE_NOTES", data: res });
      }
    } catch (error) { }
  };
};

export const updateNotes = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sticky-note`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), [
        ...data,
      ]);
      if (res?.status === 200) {
        dispatch({ type: "UPDATE_NOTES", data: res });
      }
    } catch (error) { }
  };
};

export const deleteNotes = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sticky-note`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), {
        data,
      });
      if (res?.status === 200) {
        dispatch({ type: "DELET_NOTES", data: res });
      }
    } catch (error) { }
  };
};
export const notesList = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sticky-note`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_NOTES", data: res.data });
      }
    } catch (error) { }
  };
};

export const GET_LOOKUP_WITH_SEARCH = (search = "", fied = "", api) => {
  let filter = {
    offset: 1,
    limit: 20,
    search: [
      {
        field: fied,
        data: search,
        filter: "IS",
      },
    ],
  };
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), filter);
      if (res?.status === 200) {
        dispatch({ type: "GET_LOOKUP_WITH_SEARCH", data: res?.data?.data });
      }
    } catch (error) { }
  };
};

export const GET_LOOKUP = (api) => {
  let filter = {
    offset: 1,
    limit: 100,
    search: [],
    buttonType: "All",
    profile: getUserTitle(),
  };
  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        getHeaders(),
        filter,
        false,
        false
      );
      if (res?.status === 200) {
        dispatch({ type: "GET_LOOKUP", data: res?.data?.data });
        const keys3 = Object.keys(res?.data?.data);
        return res?.data?.data[keys3[0]];
      }
    } catch (error) { }
  };
};

export const UPDATE = (api, data) => {
  let id = data.id;
  delete data._id;
  delete data.connectionId;
  delete data.id;
  delete data.ModifiedBy;
  // delete data.LeadsOwnerId
  delete data.CreatedBy;
  delete data.createdTime;
  delete data.updatedTime;

  if (api === "/SiteVisit") {
    delete data.organizationId;
    delete data.siteVisitOwnerId;
  } else if (api === "/update-sms-temp") {
    delete data.organizationId;
    delete data.siteVisitOwnerId;
    delete data.SenderId;
    delete data.id;
    delete data.SmsOwnerId;
  } else if (api === "/update-whatsapp-temp") {
    delete data.organizationId;
    delete data.WhatsappOwnerId;
    delete data.id;
    delete data.templateOwner;
  } else if (api === "/tasks") {
    delete data.organizationId;
    delete data.taskOwnerId;
    delete data.id;
  } else if (api === "/calls") {
    delete data.organizationId;
    delete data.callOwnerId;
  } else if (api === "/meeting") {
    delete data.organizationId;
    delete data.meetingOwnerId;
  } else if (api === "/leads") {
    delete data.organizationId;
    // delete data.LeadOwnerId;
  } else if (api === "/contacts") {
    delete data.organizationId;
    delete data.ContactOwnerId;
  } else if (api === "/accounts") {
    delete data.organizationId;
    delete data.AccountOwnerId;
  } else if (api === "/deals") {
    delete data.organizationId;
    delete data.DealOwnerId;
  } else if (api === "/update-email-temp") {
    delete data.organizationId;
    delete data.EmailOwnerId;
  }

  return async (dispatch) => {
    try {
      const url = `${baseUrl}${api}/${id}`;
      const res = await MakeProtectedApiCall(url, "patch", getHeaders(), {
        ...data,
      });

      if (res?.status === 200) {
        dispatch({ type: "SAVE", data: res });
      }
    } catch (error) { }
  };
};
export const SELECT_CHECKBOX = (data) => ({
  type: "SELECT_CHECKBOX",
  payload: data,
});

export const CHECK_CHAT = () => {
  return async () => {
    try {
      const url = `${baseUrl}/check-chat`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        return res?.data;
      }
    } catch (error) {
      // console.log(error);
    }
  };
};
