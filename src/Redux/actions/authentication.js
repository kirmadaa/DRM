import { MakeProtectedApiCall, errorAlert } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Handle User Login
export const HANDLE_LOGIN = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/login`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        { "content-type": "application/json" },
        data,
        true
      );
      if (res?.status === 200) {
        return { success: true, data: res?.data };
      }else if(res?.status === 400){
        return  { success: false, data: res?.data };
      }
      // return { success: false };
    } catch (error) {
      console.log(error?.response?.data.replace(/\\/g, ""));
    }
  };
};

// ** Create Account
export const REGISTER_NEW_USER_EMAIL = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/register/email`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        { "content-type": "application/json" },
        data,
        true
      );
      if (res?.status === 201) {
        return { success: true, data: res.data };
      }
      return { success: false };
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** Forgot password send email
export const FORGOT_PASSWORD = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/forgot-password`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        { "content-type": "application/json" },
        data
      );
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }else{
        errorAlert('Account not found with this email address')
      }
      // console.log(res)
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** Resetting password
export const RESET_PASSWORD = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/users/reset-password`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        { "content-type": "application/json" },
        data
      );
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** Email verification
export const EMAIL_VERIFY = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/email-verify`;
      const res = await MakeProtectedApiCall(
        url,
        "POST",
        { "content-type": "application/json" },
        data
      );
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
      return { error: true };
    }
  };
};

// ** Change password
export const CHANGE_PASSWORD = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/change-password`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
      return { error: true };
    }
  };
};

// ** Verify OTP
export const VERIFY_OTP = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/otp-verify`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
      return { error: true };
    }
  };
};

// ** Resend OTP
export const RESEND_OTP = (data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/otp-resend`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      console.log(error?.response?.data?.replace(/\\/g, ""));
      return { error: true };
    }
  };
};
