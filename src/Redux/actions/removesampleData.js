import { MakeProtectedApiCall } from "../../utility/api";
import { toast } from "react-toastify";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const SAMPLE_DATA_DELETE = (endPoint) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/${endPoint}`;
      const res = await MakeProtectedApiCall(url, "DELETE", getHeaders());
      if (res.status === 200) {
        return res;
      }else {
        if (res?.status !== 400) {
          toast.error(res?.data?.msg);
        }
      }
      return res
    } catch (e) {
      toast.error(e?.response?.data?.replace(/\\/g, ""));
    }
  };
};
