
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
    return {
      "x-auth-token": `bearer ${localStorage.getItem("accessToken")}`,
      "content-type": "application/json",
    };
  };
  
  
export const IPANEL_SEARCH = (start = 0, end = 10, search) => {
    return async (dispatch) => {
      const url = `https://api.altrr.in/brant/api/prp/${search}/${start}/${end}`;
      const res = await MakeProtectedApiCall(url, "GET", getHeaders());
      if (res?.status === 200 || res.status === 201) {
        dispatch({ type: "IPANEL_SEARCH", data: res?.data });
        return true;
      } else {
        return { success: false, data: res.data };
      }
    };
  };