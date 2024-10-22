import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const GET_ALL_EXPORT_DATA = (offset = 1, limit = 10, api, method) => {
  let filter = {
    offset: offset,
    limit: limit,
  };

  return async (dispatch) => {
    try {
      const url = `${baseUrl}/${api}`;
      //   const res = await MakeProtectedApiCall(url, method, getHeaders(), filter);
      if (method == "Post") {
        const res = await MakeProtectedApiCall(
          url,
          method,
          getHeaders(),
          filter
        );
        return res?.data?.data;
      }
    } catch (error) {}
  };
};
