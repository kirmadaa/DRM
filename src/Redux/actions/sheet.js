import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
  return {
    "x-auth-token": `bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json",
  };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Get data by module name
export const GET_SHEET_BY_MODULENAME = (moduleName) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/get-sheet?moduleTitle=${moduleName}`;
      const res = await MakeProtectedApiCall(url, "get", getHeaders());
      if (res?.status === 200) {
        let data = res.data?.data?.sheetData?.length > 0 ? res.data?.data?.sheetData[0]?.payload : null
        dispatch({ type: "GET_SHEET_BY_MODULENAME", data: data });
      }else{
        dispatch({ type: "GET_SHEET_BY_MODULENAME", data: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


// ** add sheet data by module
export const ADD_SHEET_BY_MODULENAME = (payload) => {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/sheet`;
      const res = await MakeProtectedApiCall(url, "POST", getHeaders(), payload);
      if (res?.status === 200) {
        return true
        // dispatch({ type: "ADD_SHEET_BY_MODULENAME", data: res.data });
      }
      return false
    } catch (error) {
      console.log(error);
    }
  };
};