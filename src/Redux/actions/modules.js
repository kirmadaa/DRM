
import { MakeProtectedApiCall } from "../../utility/api";

// ** Headers
const getHeaders = () => {
    return {
        "x-auth-token": `bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
    };
};

const baseUrl = process.env.REACT_APP_BASE_URL;

// ** Handle get all data
export const GET_ALL_FORMS = (page = 1, limit = 10) => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}/forms-group?offset=${page}&limit=${limit}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_ALL_FORMS", data: res?.data?.data });
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
}

// ** Handle get all data
export const GET_FOMR_LAYOUT_BY_MODULE = (page = 1, limit = 10, modulename) => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}/forms?offset=${page}&limit=${limit}&formTitle=${modulename}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_FOMR_LAYOUT_BY_MODULE", data: res?.data?.data });
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
}

export const GET_QUICK_FORM_LAYOUT_BY_MODULE = (page = 1, limit = 10, modulename) => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}/forms?offset=${page}&limit=${limit}&formTitle=${modulename}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_QUICK_FORM_LAYOUT_BY_MODULE", data: res?.data?.data });
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
}

// ** Handle get all data
export const CREATE_NEW_MODULE = (data) => {
    return async () => {
        try {
            const url = `${baseUrl}/forms`;
            const res = await MakeProtectedApiCall(url, "POST", getHeaders(), data);
            if (res?.status === 200) {
                return true
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
}


// ** Update User data
export const UPDATE_MOUDLE_BY_ID = (data, id) => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}/forms/${id}`;
            const res = await MakeProtectedApiCall(url, "PATCH", getHeaders(), data);
            if (res?.status === 200) {
                return true
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
};

export const GET_MODULE_BY_ID = (id) => {
    return async (dispatch) => {
        try {
            const url = `${baseUrl}/forms-get-by-id/${id}`;
            const res = await MakeProtectedApiCall(url, "GET", getHeaders());
            if (res?.status === 200) {
                dispatch({ type: "GET_MODULE_BY_ID", data: res?.data?.data });
            }
        } catch (e) {
            console.log(e?.response?.data?.replace(/\\/g, ""));
        }
    };
}

