import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
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

// ** Handle get all data

export const CONNECT_WITH_FACEBOOK = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook-access_token`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CONNECT_WITH_FACEBOOK",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};

export const CONNECT_WITH_FACEBOOK_CAMPAIGNS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook/get_campaigns_data`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CONNECT_WITH_FACEBOOK_CAMPAIGNS",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};
export const CONNECT_WITH_FACEBOOK_ADSETS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook/get-adsets-data`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CONNECT_WITH_FACEBOOK_ADSETS",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};

export const CONNECT_WITH_FACEBOOK_ADS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook/get-account-data`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CONNECT_WITH_FACEBOOK_ADSETS",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};

export const CONNECT_WITH_GOOGLE = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/google-access_token`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "CONNECT_WITH_FACEBOOK",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};

export const GET_FACEBOOK_PLATFORM = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/auth_url`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_FACEBOOK_PLATFORM",
          data: res,
          // pagination: res?.data?.pagination,
        });
        return res;
      } else {
        handleError(dispatch, res, "GET_FACEBOOK_PLATFORM_ERROR");
      }
    } catch (error) {}
  };
};
export const GET_GOOGLE_PLATFORM = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/credentials`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({
          type: "GET_GOOGLE_PLATFORM",
          data: res,
          // pagination: res?.data?.pagination,
        });
        return res;
      } else {
        handleError(dispatch, res, "GET_GOOGLE_PLATFORM_ERROR");
      }
    } catch (error) {}
  };
};

export const GETADSET_BYCAMPAIGNS = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook/get_specific_adsets_id`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "GETADSET_BYCAMPAIGNS",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};
export const GETADDS_BYADSET = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/facebook/get_specific_ads_id`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      if (res?.status === 200) {
        dispatch({
          type: "GETADS_BYADSET",
          data: res,
          //   pagination: res?.data?.pagination,
        });
        return res;
      }
    } catch (error) {}
  };
};
