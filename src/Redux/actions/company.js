import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get company data
export const GET_COMPANY_DATA_BY_ID = () => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-company-details-by-id`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200) {
        dispatch({ type: "GET_COMPANY_DATA_BY_ID", data: res?.data });

        return { success: true, data: res.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};

// ** Updating company details
export const UPDATE_COMPANY_DETAILS = (data) => {
  const companyId = data._id;
  delete data._id;
  return async () => {
    try {
      const url = `${baseUrl}/company-details-update/${companyId}`;
      const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
      if (res?.status === 200) {
        return { success: true, data: res?.data };
      }
    } catch (e) {
      console.log(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
