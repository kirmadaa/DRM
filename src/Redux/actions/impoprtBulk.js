import { toast } from "react-toastify";
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const IMPORT_BULK_EXCEL = (api, data) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${api}`;
      const res = await MakeProtectedApiCall(url, "post", getHeaders(), data);
      return res?.data?.data;
    } catch (error) {}
  };
};
